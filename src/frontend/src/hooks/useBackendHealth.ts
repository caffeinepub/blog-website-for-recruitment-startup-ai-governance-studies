import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';

/**
 * Lightweight health check to determine if backend is reachable
 * Uses a simple query to detect canister availability
 */
export function useBackendHealth() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<boolean>({
    queryKey: ['backendHealth'],
    queryFn: async () => {
      if (!actor) return false;
      
      try {
        // Try a lightweight query - checking if we can call any method
        // We use isCallerAdmin as it's a simple query that doesn't require auth
        await actor.isCallerAdmin();
        return true;
      } catch (error) {
        // If the call fails, backend is unavailable
        return false;
      }
    },
    enabled: !!actor && !actorFetching,
    retry: 1,
    retryDelay: 1000,
    staleTime: 30000, // Consider health status fresh for 30 seconds
  });
}
