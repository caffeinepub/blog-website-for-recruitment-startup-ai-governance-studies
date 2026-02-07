import Map "mo:core/Map";
import Time "mo:core/Time";
import Text "mo:core/Text";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import Iter "mo:core/Iter";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";
import Migration "migration";

(with migration = Migration.run)
actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  public type UserProfile = {
    name : Text;
  };

  type Article = {
    id : Nat;
    slug : Text;
    title : Text;
    content : Text;
    author : ?Text;
    tags : [Text];
    published : Bool;
    timestamp : Int;
  };

  type ArticleUpdate = {
    title : Text;
    content : Text;
    author : ?Text;
    tags : [Text];
  };

  module Article {
    public func compareByTimestamp(a : Article, b : Article) : Order.Order {
      Int.compare(b.timestamp, a.timestamp);
    };
  };

  let articles = Map.empty<Nat, Article>();
  let userProfiles = Map.empty<Principal, UserProfile>();
  var nextArticleId = 1;

  func getNextArticleId() : Nat {
    let id = nextArticleId;
    nextArticleId += 1;
    id;
  };

  // User Profile Management
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // --- Public Queries without authentication (Guest access allowed) ---
  public query ({ caller }) func listPublishedArticles() : async [Article] {
    articles.values().filter(func(a) { a.published }).toArray().sort(Article.compareByTimestamp);
  };

  public query ({ caller }) func getPublicArticleBySlug(slug : Text) : async ?Article {
    articles.values().find(func(a) { a.slug == slug and a.published });
  };

  public query ({ caller }) func searchArticlesByTag(tag : Text) : async [Article] {
    articles.values().filter(
      func(article) {
        article.published and article.tags.values().any(
          func(t) { t == tag }
        );
      }
    ).toArray();
  };

  // Legacy method - admins can see unpublished, guests only see published
  public query ({ caller }) func getArticleBySlug(slug : Text) : async Article {
    let matching = articles.values().find(func(a) { a.slug == slug });
    switch (matching) {
      case (?article) {
        // Admins can view any article, guests only published ones
        if (article.published or AccessControl.isAdmin(accessControlState, caller)) {
          article;
        } else {
          Runtime.trap("Article is not published");
        };
      };
      case (null) { Runtime.trap("Article not found") };
    };
  };

  // Admins can view any article by ID, guests only published ones
  public query ({ caller }) func getArticleById(id : Nat) : async Article {
    switch (articles.get(id)) {
      case (?article) {
        if (article.published or AccessControl.isAdmin(accessControlState, caller)) {
          article;
        } else {
          Runtime.trap("Article is not published");
        };
      };
      case (null) { Runtime.trap("Article not found") };
    };
  };

  // --- Admin-only: Fetching all articles (including unpublished) ---
  public query ({ caller }) func listAllArticlesAdmin() : async [Article] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Access denied. Admin role required!");
    };
    articles.values().toArray().sort(Article.compareByTimestamp);
  };

  public query ({ caller }) func getAllSlugsAdmin() : async [Text] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Access denied. Admin role required!");
    };
    articles.values().map(func(article) { article.slug }).toArray();
  };

  // --- Admin-only: Article Management ---
  public shared ({ caller }) func createArticle(slug : Text, update : ArticleUpdate) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Access denied. Admin role required!");
    };

    if (articles.values().any(func(article) { article.slug == slug })) {
      Runtime.trap("Duplicate slug detected");
    };

    let id = getNextArticleId();
    let article : Article = {
      id;
      slug;
      title = update.title;
      content = update.content;
      author = update.author;
      tags = update.tags;
      published = false;
      timestamp = Time.now();
    };
    articles.add(id, article);
  };

  public shared ({ caller }) func updateArticle(id : Nat, update : ArticleUpdate) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Access denied. Admin role required!");
    };

    let existing = switch (articles.get(id)) {
      case (null) { Runtime.trap("Article not found") };
      case (?a) { a };
    };

    let updatedArticle : Article = {
      id = existing.id;
      slug = existing.slug;
      title = update.title;
      content = update.content;
      author = update.author;
      tags = update.tags;
      published = existing.published;
      timestamp = Time.now();
    };
    articles.add(id, updatedArticle);
  };

  public shared ({ caller }) func publishArticle(id : Nat, published : Bool) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Access denied. Admin role required!");
    };

    let existing = switch (articles.get(id)) {
      case (null) { Runtime.trap("Article not found") };
      case (?a) { a };
    };

    let updatedArticle : Article = {
      id = existing.id;
      slug = existing.slug;
      title = existing.title;
      content = existing.content;
      author = existing.author;
      tags = existing.tags;
      published;
      timestamp = existing.timestamp;
    };
    articles.add(id, updatedArticle);
  };

  public shared ({ caller }) func deleteArticle(id : Nat) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Access denied. Admin role required!");
    };
    if (not articles.containsKey(id)) {
      Runtime.trap("Article not found");
    };
    articles.remove(id);
  };
};
