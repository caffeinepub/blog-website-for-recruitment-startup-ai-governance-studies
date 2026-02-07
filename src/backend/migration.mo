import Map "mo:core/Map";
import Principal "mo:core/Principal";

module {
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

  type OldActor = {
    articles : Map.Map<Nat, Article>;
    userProfiles : Map.Map<Principal, { name : Text }>;
    nextArticleId : Nat;
  };

  type NewActor = {
    articles : Map.Map<Nat, Article>;
    userProfiles : Map.Map<Principal, { name : Text }>;
    nextArticleId : Nat;
  };

  public func run(old : OldActor) : NewActor {
    { old with nextArticleId = old.nextArticleId };
  };
};
