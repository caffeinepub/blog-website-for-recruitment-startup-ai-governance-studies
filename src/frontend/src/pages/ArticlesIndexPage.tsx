import { useState, useEffect } from 'react';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { useListPublishedArticles, useIsCallerAdmin } from '../hooks/useQueries';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Loader2 } from 'lucide-react';
import ArticlesList from '../components/articles/ArticlesList';
import TagFilterBar from '../components/articles/TagFilterBar';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { getAllTemplateArticles } from '../utils/templateArticles';
import { classifyBackendError } from '../utils/backendError';
import { useBackendHealth } from '../hooks/useBackendHealth';
import FriendlyErrorState from '../components/shared/FriendlyErrorState';

export default function ArticlesIndexPage() {
  const { data: publishedArticles = [], isLoading, error, isFetched, refetch } = useListPublishedArticles();
  const { data: isBackendHealthy = true } = useBackendHealth();
  const { identity } = useInternetIdentity();
  const { data: isAdmin = false } = useIsCallerAdmin();
  const navigate = useNavigate();
  const search = useSearch({ strict: false }) as { topic?: string };
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Apply topic filter from URL on mount and when search changes
  useEffect(() => {
    if (search?.topic) {
      setSelectedTag(search.topic);
    }
  }, [search?.topic]);

  const isAuthenticated = !!identity;

  // Determine which articles to show
  const hasBackendError = !!error;
  const shouldUseFallback = hasBackendError || (!isLoading && publishedArticles.length === 0 && !isBackendHealthy);
  
  const articles = shouldUseFallback
    ? getAllTemplateArticles()
    : publishedArticles;

  const allTags = Array.from(new Set(articles.flatMap((article) => article.tags || [])));

  // Highlight the three main topics
  const mainTopics = ['Recruitment', 'Attrition', 'AI Ethics'];
  const otherTags = allTags.filter(tag => !mainTopics.includes(tag));
  const sortedTags = [...mainTopics.filter(t => allTags.includes(t)), ...otherTags];

  const filteredArticles = articles.filter((article) => {
    const title = String(article.title || '').toLowerCase();
    const content = String(article.textContent || '').toLowerCase();
    const tags = Array.isArray(article.tags) ? article.tags : [];
    
    const matchesSearch =
      searchQuery === '' ||
      title.includes(searchQuery.toLowerCase()) ||
      content.includes(searchQuery.toLowerCase()) ||
      tags.some((tag) => String(tag).toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesTag = !selectedTag || tags.includes(selectedTag);

    return matchesSearch && matchesTag;
  });

  const handleSelectTag = (tag: string | null) => {
    setSelectedTag(tag);
    // Clear topic from URL when manually changing filter
    if (search?.topic) {
      navigate({ to: '/articles', search: {} });
    }
  };

  // Classify error for user-friendly messaging
  const classifiedError = error ? classifyBackendError(error) : null;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            Beyond the resume
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Exploring fair AI in recruitment and retention. Practical insights, technical deep dives, and thoughts on building transparent, verifiable systems for high-stakes hiring decisions.
          </p>
        </div>

        {/* Search */}
        <div className="relative max-w-xl">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
            disabled={isLoading}
          />
        </div>

        {/* Tag Filter */}
        {sortedTags.length > 0 && (
          <TagFilterBar
            tags={sortedTags}
            selectedTag={selectedTag}
            onSelectTag={handleSelectTag}
          />
        )}

        {/* Error State - Non-blocking, shows above fallback content */}
        {hasBackendError && (
          <FriendlyErrorState
            title="Unable to load latest articles"
            message={classifiedError?.userMessage || 'Showing template articles instead. Please try again later.'}
            technicalDetails={classifiedError?.technicalDetails}
            onRetry={() => refetch()}
            retryLabel="Try again"
            variant="default"
          />
        )}

        {/* Loading State */}
        {isLoading && !shouldUseFallback && (
          <div className="flex items-center justify-center min-h-[40vh]">
            <div className="text-center space-y-4">
              <Loader2 className="h-8 w-8 animate-spin mx-auto text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                Loading articles...
              </p>
            </div>
          </div>
        )}

        {/* Articles List */}
        {!isLoading && (
          <>
            {filteredArticles.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  {searchQuery || selectedTag
                    ? 'No articles found matching your criteria.'
                    : 'No articles published yet.'}
                </p>
                {(searchQuery || selectedTag) && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedTag(null);
                    }}
                    className="mt-4"
                  >
                    Clear filters
                  </Button>
                )}
              </div>
            ) : (
              <ArticlesList articles={filteredArticles} isAdmin={isAuthenticated && isAdmin} />
            )}
          </>
        )}
      </div>
    </div>
  );
}
