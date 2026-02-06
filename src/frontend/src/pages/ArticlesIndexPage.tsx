import { useState } from 'react';
import { useListPublishedArticles } from '../hooks/useQueries';
import { Input } from '@/components/ui/input';
import { Search, Loader2 } from 'lucide-react';
import ArticlesList from '../components/articles/ArticlesList';
import TagFilterBar from '../components/articles/TagFilterBar';

export default function ArticlesIndexPage() {
  const { data: articles = [], isLoading, error, isFetched } = useListPublishedArticles();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const allTags = Array.from(new Set(articles.flatMap((article) => article.tags)));

  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      searchQuery === '' ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesTag = !selectedTag || article.tags.includes(selectedTag);

    return matchesSearch && matchesTag;
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-center min-h-[40vh]">
          <div className="text-center space-y-4">
            <Loader2 className="h-8 w-8 animate-spin mx-auto text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Loading articles...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-center min-h-[40vh]">
          <div className="text-center space-y-4">
            <p className="text-destructive font-medium">Error loading articles</p>
            <p className="text-sm text-muted-foreground">{error.message}</p>
          </div>
        </div>
      </div>
    );
  }

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

        {/* Articles List */}
        {isFetched && filteredArticles.length === 0 && articles.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-border rounded-lg">
            <p className="text-muted-foreground">No articles published yet. Check back soon!</p>
          </div>
        ) : filteredArticles.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-border rounded-lg">
            <p className="text-muted-foreground">
              No articles match your search. Try different keywords or clear filters.
            </p>
          </div>
        ) : (
          <ArticlesList articles={filteredArticles} />
        )}
      </div>
    </div>
  );
}
