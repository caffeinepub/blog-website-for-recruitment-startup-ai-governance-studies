// No backend/Motoko changes needed. The fix needed is 100% type-script (frontend) only.
// No backend access pattern changes are necessary in Motoko.
import Map "mo:core/Map";
import Iter "mo:core/Iter";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import Order "mo:core/Order";
import Text "mo:core/Text";
import Runtime "mo:core/Runtime";
import AccessControl "authorization/access-control";
import Storage "blob-storage/Storage";
import MixinAuthorization "authorization/MixinAuthorization";
import MixinStorage "blob-storage/Mixin";

actor {
  include MixinStorage();

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  public type UserProfile = {
    name : Text;
  };

  public type RestEndpointConfig = {
    id : Text;
    endpointUrl : Text;
    apiKey : ?Text;
    enabled : Bool;
  };

  public type Article = {
    id : Nat;
    slug : Text;
    title : Text;
    textContent : Text;
    author : ?Text;
    tags : [Text];
    published : Bool;
    timestamp : Int;
    pdf : ?Storage.ExternalBlob;
    textAttachment : ?Storage.ExternalBlob;
  };

  public type ArticleUpdate = {
    title : Text;
    textContent : Text;
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
  var restEndpointConfig : ?RestEndpointConfig = null;

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

  // --- REST Endpoint Integrator Management ---
  public shared ({ caller }) func setRestEndpointConfig(config : RestEndpointConfig) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Access denied. Admin role required!");
    };
    restEndpointConfig := ?config;
  };

  public shared ({ caller }) func clearRestEndpointConfig() : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Access denied. Admin role required!");
    };
    restEndpointConfig := null;
  };

  public query ({ caller }) func getRestEndpointStatus() : async {
    configs : ?RestEndpointConfig;
    status : Text;
  } {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only authenticated users can view endpoint configuration");
    };
    switch (restEndpointConfig) {
      case (null) {
        {
          configs = null;
          status = "No Articles REST endpoint configured";
        };
      };
      case (?config) {
        {
          configs = ?config;
          status = "Articles REST endpoint configured";
        };
      };
    };
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
      textContent = update.textContent;
      author = update.author;
      tags = update.tags;
      published = false;
      timestamp = Time.now();
      pdf = null;
      textAttachment = null;
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
      textContent = update.textContent;
      author = update.author;
      tags = update.tags;
      published = existing.published;
      timestamp = Time.now();
      pdf = existing.pdf;
      textAttachment = existing.textAttachment;
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
      textContent = existing.textContent;
      author = existing.author;
      tags = existing.tags;
      published;
      timestamp = existing.timestamp;
      pdf = existing.pdf;
      textAttachment = existing.textAttachment;
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

  // Attach PDF to article (admin-only)
  public shared ({ caller }) func attachPdfToArticle(id : Nat, blob : Storage.ExternalBlob) : async () {
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
      textContent = existing.textContent;
      author = existing.author;
      tags = existing.tags;
      published = existing.published;
      timestamp = existing.timestamp;
      pdf = ?blob;
      textAttachment = existing.textAttachment;
    };
    articles.add(id, updatedArticle);
  };

  // Attach text file to article (admin-only)
  public shared ({ caller }) func attachTextFileToArticle(id : Nat, blob : Storage.ExternalBlob) : async () {
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
      textContent = existing.textContent;
      author = existing.author;
      tags = existing.tags;
      published = existing.published;
      timestamp = existing.timestamp;
      pdf = existing.pdf;
      textAttachment = ?blob;
    };
    articles.add(id, updatedArticle);
  };

  // Remove PDF from article (admin-only)
  public shared ({ caller }) func removePdfFromArticle(id : Nat) : async () {
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
      textContent = existing.textContent;
      author = existing.author;
      tags = existing.tags;
      published = existing.published;
      timestamp = existing.timestamp;
      pdf = null;
      textAttachment = existing.textAttachment;
    };
    articles.add(id, updatedArticle);
  };

  // Remove text file from article (admin-only)
  public shared ({ caller }) func removeTextFileFromArticle(id : Nat) : async () {
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
      textContent = existing.textContent;
      author = existing.author;
      tags = existing.tags;
      published = existing.published;
      timestamp = existing.timestamp;
      pdf = existing.pdf;
      textAttachment = null;
    };
    articles.add(id, updatedArticle);
  };
};
