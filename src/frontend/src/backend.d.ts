import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ArticleUpdate {
    title: string;
    content: string;
    tags: Array<string>;
    author?: string;
}
export interface UserProfile {
    name: string;
}
export interface Article {
    id: bigint;
    title: string;
    content: string;
    published: boolean;
    slug: string;
    tags: Array<string>;
    author?: string;
    timestamp: bigint;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createArticle(slug: string, update: ArticleUpdate): Promise<void>;
    deleteArticle(id: bigint): Promise<void>;
    getAllSlugsAdmin(): Promise<Array<string>>;
    getArticleById(id: bigint): Promise<Article>;
    getArticleBySlug(slug: string): Promise<Article>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getPublicArticleBySlug(slug: string): Promise<Article | null>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    listAllArticlesAdmin(): Promise<Array<Article>>;
    listPublishedArticles(): Promise<Array<Article>>;
    publishArticle(id: bigint, published: boolean): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    searchArticlesByTag(tag: string): Promise<Array<Article>>;
    updateArticle(id: bigint, update: ArticleUpdate): Promise<void>;
}
