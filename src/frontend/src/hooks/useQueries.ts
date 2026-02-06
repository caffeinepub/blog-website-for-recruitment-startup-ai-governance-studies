import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Article, ArticleUpdate, UserProfile, UserRole } from '../backend';
import { Principal } from '@dfinity/principal';

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
      try {
        return await actor.isCallerAdmin();
      } catch {
        return false;
      }
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });
}

export function useGetCallerUserRole() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<UserRole>({
    queryKey: ['callerUserRole'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerUserRole();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });
}

// Article Queries (Public)
export function useListPublishedArticles() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<Article[]>({
    queryKey: ['publishedArticles'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listPublishedArticles();
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useGetArticleBySlug(slug: string) {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<Article | null>({
    queryKey: ['article', slug],
    queryFn: async () => {
      if (!actor) return null;
      try {
        return await actor.getArticleBySlug(slug);
      } catch (error) {
        console.error('Error fetching article:', error);
        return null;
      }
    },
    enabled: !!actor && !actorFetching && !!slug,
  });
}

export function useSearchArticlesByTag(tag: string) {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<Article[]>({
    queryKey: ['articlesByTag', tag],
    queryFn: async () => {
      if (!actor) return [];
      return actor.searchArticlesByTag(tag);
    },
    enabled: !!actor && !actorFetching && !!tag,
  });
}

// Article Mutations (Admin)
export function useCreateArticle() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ slug, update }: { slug: string; update: ArticleUpdate }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.createArticle(slug, update);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['publishedArticles'] });
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['publishedArticles'] });
      queryClient.invalidateQueries({ queryKey: ['article'] });
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['publishedArticles'] });
      queryClient.invalidateQueries({ queryKey: ['article'] });
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
      queryClient.invalidateQueries({ queryKey: ['publishedArticles'] });
      queryClient.invalidateQueries({ queryKey: ['article'] });
    },
  });
}
