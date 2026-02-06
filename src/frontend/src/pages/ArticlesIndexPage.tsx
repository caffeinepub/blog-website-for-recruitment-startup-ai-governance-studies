import { useState, useMemo } from 'react';
import { useListPublishedArticles } from '../hooks/useQueries';
import ArticlesList from '../components/articles/ArticlesList';
import TagFilterBar from '../components/articles/TagFilterBar';
import { Input } from '@/components/ui/input';
import { Search, Loader2 } from 'lucide-react';

export default function ArticlesIndexPage() {
  const { data: articles = [], isLoading } = useListPublishedArticles();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Extract all unique tags
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    articles.forEach((article) => {
      article.tags.forEach((tag) => tagSet.add(tag));
    });
    return Array.from(tagSet).sort();
  }, [articles]);

  // Filter articles based on search and tag
  const filteredArticles = useMemo(() => {
    let filtered = articles;

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (article) =>
          article.title.toLowerCase().includes(query) ||
          article.content.toLowerCase().includes(query)
      );
    }

    // Filter by selected tag
    if (selectedTag) {
      filtered = filtered.filter((article) => article.tags.includes(selectedTag));
    }

    return filtered;
  }, [articles, searchQuery, selectedTag]);

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

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Articles</h1>
          <p className="text-lg text-muted-foreground">
            Insights on AI governance, constraint geometry, and recruitment innovation.
          </p>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
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
        {filteredArticles.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              {searchQuery || selectedTag ? 'No articles found matching your criteria.' : 'No articles published yet.'}
            </p>
          </div>
        ) : (
          <ArticlesList articles={filteredArticles} />
        )}
      </div>
    </div>
  );
}
