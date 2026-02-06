import { useParams, Link } from '@tanstack/react-router';
import { useGetPublicArticleBySlug } from '../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Calendar, User, Loader2 } from 'lucide-react';
import MarkdownRenderer from '../components/content/MarkdownRenderer';
import { formatTimestampSafe } from '../utils/articleDate';
import { format } from 'date-fns';

export default function ArticleDetailPage() {
  const { slug } = useParams({ from: '/articles/$slug' });
  const { data: article, isLoading, error } = useGetPublicArticleBySlug(slug);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-center min-h-[40vh]">
          <div className="text-center space-y-4">
            <Loader2 className="h-8 w-8 animate-spin mx-auto text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Loading article...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-center min-h-[40vh]">
          <div className="text-center space-y-4">
            <p className="text-destructive font-medium">Article not found</p>
            <p className="text-sm text-muted-foreground">
              {error?.message || 'This article may have been unpublished or removed.'}
            </p>
            <Link to="/articles">
              <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Articles
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const title = String(article.title || 'Untitled');
  const content = String(article.content || '');
  const tags = Array.isArray(article.tags) ? article.tags : [];
  const author = article.author ? String(article.author) : null;
  const formattedDate = formatTimestampSafe(
    article.timestamp,
    (date) => format(date, 'MMMM d, yyyy'),
    'Date unavailable'
  );

  return (
    <article className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Back Button */}
        <Link to="/articles">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Articles
          </Button>
        </Link>

        {/* Article Header */}
        <header className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">{title}</h1>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            {author && (
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{author}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <time>{formattedDate}</time>
            </div>
          </div>

          {/* Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </header>

        {/* Article Content */}
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <MarkdownRenderer content={content} />
        </div>

        {/* Footer */}
        <footer className="pt-8 border-t border-border">
          <Link to="/articles">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Articles
            </Button>
          </Link>
        </footer>
      </div>
    </article>
  );
}
