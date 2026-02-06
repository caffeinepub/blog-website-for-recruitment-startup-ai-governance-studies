import Map "mo:core/Map";
import Time "mo:core/Time";
import Array "mo:core/Array";
import Text "mo:core/Text";
import Order "mo:core/Order";
import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Iter "mo:core/Iter";
import Error "mo:core/Error";
import Principal "mo:core/Principal";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";

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

  stable let articles = Map.empty<Nat, Article>();
  stable var nextArticleId : Nat = 1;
  stable let userProfiles = Map.empty<Principal, UserProfile>();

  // Helper to generate unique IDs for articles
  func getNextArticleId() : Nat {
    let id = nextArticleId;
    nextArticleId += 1;
    id;
  };

  // User Profile Management
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
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
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Public query - no authentication required for published articles
  public query ({ caller }) func listPublishedArticles() : async [Article] {
    let publishedIter = articles.values().filter(
      func(article) { article.published }
    );
    let sorted = publishedIter.toArray().sort(Article.compareByTimestamp);
    sorted;
  };

  // Public query - guests can view published articles, admins can view all
  public query ({ caller }) func getArticleBySlug(slug : Text) : async Article {
    for (article in articles.values()) {
      if (article.slug == slug) {
        if (article.published or AccessControl.isAdmin(accessControlState, caller)) {
          return article;
        } else {
          Runtime.trap("Article is not published");
        };
      };
    };
    Runtime.trap("Article not found");
  };

  // Public query - no authentication required for searching published articles
  public query ({ caller }) func searchArticlesByTag(tag : Text) : async [Article] {
    let filteredIter = articles.values().filter(
      func(article) {
        article.published and article.tags.values().any(
          func(t) { t == tag }
        );
      }
    );
    filteredIter.toArray();
  };

  // Admin-only: Create article
  public shared ({ caller }) func createArticle(slug : Text, update : ArticleUpdate) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can create articles");
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

  // Admin-only: Update article
  public shared ({ caller }) func updateArticle(id : Nat, update : ArticleUpdate) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can update articles");
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

  // Admin-only: Publish/unpublish article
  public shared ({ caller }) func publishArticle(id : Nat, published : Bool) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can publish/unpublish articles");
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

  // Admin-only: Delete article
  public shared ({ caller }) func deleteArticle(id : Nat) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can delete articles");
    };

    if (not articles.containsKey(id)) {
      Runtime.trap("Article not found");
    };

    articles.remove(id);
  };
};
