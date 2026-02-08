import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface ArticleUpdate {
    title: string;
    tags: Array<string>;
    author?: string;
    textContent: string;
}
export interface RestEndpointConfig {
    id: string;
    enabled: boolean;
    endpointUrl: string;
    apiKey?: string;
}
export interface Article {
    id: bigint;
    pdf?: ExternalBlob;
    title: string;
    published: boolean;
    slug: string;
    tags: Array<string>;
    author?: string;
    timestamp: bigint;
    textAttachment?: ExternalBlob;
    textContent: string;
}
export interface UserProfile {
    name: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    attachPdfToArticle(id: bigint, blob: ExternalBlob): Promise<void>;
    attachTextFileToArticle(id: bigint, blob: ExternalBlob): Promise<void>;
    clearRestEndpointConfig(): Promise<void>;
    createArticle(slug: string, update: ArticleUpdate): Promise<void>;
    deleteArticle(id: bigint): Promise<void>;
    getAllSlugsAdmin(): Promise<Array<string>>;
    getArticleById(id: bigint): Promise<Article>;
    getArticleBySlug(slug: string): Promise<Article>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getPublicArticleBySlug(slug: string): Promise<Article | null>;
    getRestEndpointStatus(): Promise<{
        status: string;
        configs?: RestEndpointConfig;
    }>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    listAllArticlesAdmin(): Promise<Array<Article>>;
    listPublishedArticles(): Promise<Array<Article>>;
    publishArticle(id: bigint, published: boolean): Promise<void>;
    removePdfFromArticle(id: bigint): Promise<void>;
    removeTextFileFromArticle(id: bigint): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    searchArticlesByTag(tag: string): Promise<Array<Article>>;
    setRestEndpointConfig(config: RestEndpointConfig): Promise<void>;
    updateArticle(id: bigint, update: ArticleUpdate): Promise<void>;
}
