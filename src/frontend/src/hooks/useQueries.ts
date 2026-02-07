import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Article, ArticleUpdate, UserProfile } from '../backend';
import { toast } from 'sonner';
import { articleTemplates } from '../content/articleTemplates';

// Helper function to normalize article data from backend
function normalizeArticle(article: Article): Article {
  return {
    id: typeof article.id === 'bigint' ? article.id : BigInt(article.id || 0),
    slug: String(article.slug || ''),
    title: String(article.title || ''),
    content: String(article.content || ''),
    author: article.author ? String(article.author) : undefined,
    tags: Array.isArray(article.tags) ? article.tags.map(String) : [],
    published: Boolean(article.published),
    timestamp: typeof article.timestamp === 'bigint' ? article.timestamp : BigInt(article.timestamp || 0),
  };
}

// User Profile Queries
export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<UserProfile | null>({
    queryKey: ['currentUserProfile'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useSaveCallerUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error('Actor not available');
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}

// Authorization Queries
export function useIsCallerAdmin() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<boolean>({
    queryKey: ['isCallerAdmin'],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !actorFetching,
  });
}

// Public Article Queries (no auth required)
export function useListPublishedArticles() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<Article[]>({
    queryKey: ['publishedArticles'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      const articles = await actor.listPublishedArticles();
      return articles.map(normalizeArticle);
    },
    enabled: !!actor && !actorFetching,
    retry: 1,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useGetPublicArticleBySlug(slug: string) {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<Article | null>({
    queryKey: ['publicArticle', slug],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      const article = await actor.getPublicArticleBySlug(slug);
      return article ? normalizeArticle(article) : null;
    },
    enabled: !!actor && !actorFetching && !!slug,
    retry: 1,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useSearchArticlesByTag(tag: string) {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<Article[]>({
    queryKey: ['articlesByTag', tag],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      const articles = await actor.searchArticlesByTag(tag);
      return articles.map(normalizeArticle);
    },
    enabled: !!actor && !actorFetching && !!tag,
    retry: 1,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

// Admin Article Queries
export function useListAllArticlesAdmin() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<Article[]>({
    queryKey: ['allArticlesAdmin'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      const articles = await actor.listAllArticlesAdmin();
      return articles.map(normalizeArticle);
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useGetArticleById(id: string | null) {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<Article>({
    queryKey: ['article', id],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      if (!id) throw new Error('Article ID is required');
      const article = await actor.getArticleById(BigInt(id));
      return normalizeArticle(article);
    },
    enabled: !!actor && !actorFetching && !!id,
  });
}

export function useGetAllSlugsAdmin() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<string[]>({
    queryKey: ['allSlugsAdmin'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getAllSlugsAdmin();
    },
    enabled: !!actor && !actorFetching,
  });
}

// Admin Article Mutations
export function useCreateArticle() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ slug, update }: { slug: string; update: ArticleUpdate }) => {
      if (!actor) throw new Error('Actor not available');
      await actor.createArticle(slug, update);
      const articles = await actor.listAllArticlesAdmin();
      const newArticle = articles.find((a) => a.slug === slug);
      if (!newArticle) throw new Error('Article created but not found');
      return normalizeArticle(newArticle);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allArticlesAdmin'] });
      queryClient.invalidateQueries({ queryKey: ['allSlugsAdmin'] });
    },
  });
}

export function useUpdateArticle() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, update }: { id: bigint; update: ArticleUpdate }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updateArticle(id, update);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['allArticlesAdmin'] });
      queryClient.invalidateQueries({ queryKey: ['article', variables.id.toString()] });
      queryClient.invalidateQueries({ queryKey: ['allSlugsAdmin'] });
    },
  });
}

export function usePublishArticle() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, published }: { id: bigint; published: boolean }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.publishArticle(id, published);
    },
    onSuccess: (_, variables) => {
      // Invalidate admin queries
      queryClient.invalidateQueries({ queryKey: ['allArticlesAdmin'] });
      queryClient.invalidateQueries({ queryKey: ['article', variables.id.toString()] });
      
      // Invalidate public queries to ensure newly published articles appear immediately
      queryClient.invalidateQueries({ queryKey: ['publishedArticles'] });
      queryClient.invalidateQueries({ queryKey: ['publicArticle'] });
      queryClient.invalidateQueries({ queryKey: ['articlesByTag'] });
    },
  });
}

export function useDeleteArticle() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error('Actor not available');
      return actor.deleteArticle(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allArticlesAdmin'] });
      queryClient.invalidateQueries({ queryKey: ['allSlugsAdmin'] });
      // Also invalidate public queries in case a published article was deleted
      queryClient.invalidateQueries({ queryKey: ['publishedArticles'] });
      queryClient.invalidateQueries({ queryKey: ['publicArticle'] });
      queryClient.invalidateQueries({ queryKey: ['articlesByTag'] });
    },
  });
}

// Bulk operations
export function useBulkRecreateDefaultArticles() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error('Actor not available');

      const existingSlugs = await actor.getAllSlugsAdmin();
      const allArticles = await actor.listAllArticlesAdmin();

      for (const template of articleTemplates) {
        const existingArticle = allArticles.find((a) => a.slug === template.slug);

        const update: ArticleUpdate = {
          title: template.title,
          content: template.content,
          author: template.author,
          tags: template.tags,
        };

        if (existingArticle) {
          await actor.updateArticle(existingArticle.id, update);
          if (!existingArticle.published) {
            await actor.publishArticle(existingArticle.id, true);
          }
        } else {
          await actor.createArticle(template.slug, update);
          const articles = await actor.listAllArticlesAdmin();
          const newArticle = articles.find((a) => a.slug === template.slug);
          if (newArticle) {
            await actor.publishArticle(newArticle.id, true);
          }
        }
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allArticlesAdmin'] });
      queryClient.invalidateQueries({ queryKey: ['allSlugsAdmin'] });
      // Invalidate public queries to show newly published articles
      queryClient.invalidateQueries({ queryKey: ['publishedArticles'] });
      queryClient.invalidateQueries({ queryKey: ['publicArticle'] });
      queryClient.invalidateQueries({ queryKey: ['articlesByTag'] });
    },
  });
}

export function useCreateOrUpdateAndPublishTemplate() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      slug,
      title,
      content,
      author,
      tags,
    }: {
      slug: string;
      title: string;
      content: string;
      author?: string;
      tags: string[];
    }) => {
      if (!actor) throw new Error('Actor not available');

      const allArticles = await actor.listAllArticlesAdmin();
      const existingArticle = allArticles.find((a) => a.slug === slug);

      const update: ArticleUpdate = {
        title,
        content,
        author,
        tags,
      };

      if (existingArticle) {
        await actor.updateArticle(existingArticle.id, update);
        await actor.publishArticle(existingArticle.id, true);
        return { action: 'updated' as const, id: existingArticle.id };
      } else {
        await actor.createArticle(slug, update);
        const articles = await actor.listAllArticlesAdmin();
        const newArticle = articles.find((a) => a.slug === slug);
        if (!newArticle) throw new Error('Article created but not found');
        await actor.publishArticle(newArticle.id, true);
        return { action: 'created' as const, id: newArticle.id };
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allArticlesAdmin'] });
      queryClient.invalidateQueries({ queryKey: ['allSlugsAdmin'] });
      // Invalidate public queries to ensure immediate visibility
      queryClient.invalidateQueries({ queryKey: ['publishedArticles'] });
      queryClient.invalidateQueries({ queryKey: ['publicArticle'] });
      queryClient.invalidateQueries({ queryKey: ['articlesByTag'] });
    },
  });
}
