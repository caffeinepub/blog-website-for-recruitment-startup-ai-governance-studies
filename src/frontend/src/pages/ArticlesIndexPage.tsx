import { useState } from 'react';
import { useListPublishedArticles } from '../hooks/useQueries';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Loader2, AlertCircle, RefreshCw } from 'lucide-react';
import ArticlesList from '../components/articles/ArticlesList';
import TagFilterBar from '../components/articles/TagFilterBar';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function ArticlesIndexPage() {
  const { data: articles = [], isLoading, error, isFetched, refetch } = useListPublishedArticles();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const allTags = Array.from(new Set(articles.flatMap((article) => article.tags || [])));

  const filteredArticles = articles.filter((article) => {
    const title = String(article.title || '').toLowerCase();
    const content = String(article.content || '').toLowerCase();
    const tags = Array.isArray(article.tags) ? article.tags : [];
    
    const matchesSearch =
      searchQuery === '' ||
      title.includes(searchQuery.toLowerCase()) ||
      content.includes(searchQuery.toLowerCase()) ||
      tags.some((tag) => String(tag).toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesTag = !selectedTag || tags.includes(selectedTag);

    return matchesSearch && matchesTag;
  });

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Articles</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Insights on recruitment, attrition, and AI-powered talent intelligence.
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
        {allTags.length > 0 && (
          <TagFilterBar
            tags={allTags}
            selectedTag={selectedTag}
            onSelectTag={setSelectedTag}
          />
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center min-h-[40vh]">
            <div className="text-center space-y-4">
              <Loader2 className="h-8 w-8 animate-spin mx-auto text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Loading articles...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {!isLoading && error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error loading articles</AlertTitle>
            <AlertDescription className="mt-2 space-y-3">
              <p className="text-sm">
                {error instanceof Error ? error.message : 'An unexpected error occurred while loading articles.'}
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => refetch()}
                className="mt-2"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Try Again
              </Button>
            </AlertDescription>
          </Alert>
        )}

        {/* Empty State - No Articles */}
        {!isLoading && !error && isFetched && articles.length === 0 && (
          <div className="text-center py-12 border border-dashed border-border rounded-lg">
            <p className="text-muted-foreground">No articles published yet. Check back soon!</p>
          </div>
        )}

        {/* Empty State - No Filtered Results */}
        {!isLoading && !error && isFetched && articles.length > 0 && filteredArticles.length === 0 && (
          <div className="text-center py-12 border border-dashed border-border rounded-lg">
            <p className="text-muted-foreground">
              No articles match your search. Try different keywords or clear filters.
            </p>
          </div>
        )}

        {/* Articles List */}
        {!isLoading && !error && filteredArticles.length > 0 && (
          <ArticlesList articles={filteredArticles} />
        )}
      </div>
    </div>
  );
}
