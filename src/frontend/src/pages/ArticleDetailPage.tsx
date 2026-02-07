import { useParams, Link } from '@tanstack/react-router';
import { useGetPublicArticleBySlug } from '../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Calendar, User, Loader2 } from 'lucide-react';
import MarkdownRenderer from '../components/content/MarkdownRenderer';
import { formatTimestampSafe } from '../utils/articleDate';
import { maskSubstrateNames } from '@/utils/layerMask';

export default function ArticleDetailPage() {
  const { slug } = useParams({ strict: false });
  const { data: article, isLoading, error, isFetched } = useGetPublicArticleBySlug(slug || '');

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

  if (error || (isFetched && !article)) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-center min-h-[40vh]">
          <div className="text-center space-y-4">
            <p className="text-destructive font-medium">Article not found</p>
            <p className="text-sm text-muted-foreground">
              {error?.message || 'The article you are looking for does not exist or is not published.'}
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

  if (!article) {
    return null;
  }

  // Defensive guards for all article fields
  const safeTitle = article.title ? String(article.title) : 'Untitled';
  const safeAuthor = article.author ? String(article.author) : null;
  const safeTags = Array.isArray(article.tags) ? article.tags : [];
  const safeContent = article.content ? String(article.content) : '';
  const safeTimestamp = article.timestamp != null ? article.timestamp : null;

  // Mask substrate names in title and author
  const maskedTitle = maskSubstrateNames(safeTitle);
  const maskedAuthor = safeAuthor ? maskSubstrateNames(safeAuthor) : null;

  const formattedDate = formatTimestampSafe(
    safeTimestamp,
    (date) => {
      const options: Intl.DateTimeFormatOptions = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      };
      return date.toLocaleDateString('en-US', options);
    },
    'Date unavailable'
  );

  return (
    <div className="min-h-screen bg-background">
      <article className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <div className="mb-8">
            <Link to="/articles">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Articles
              </Button>
            </Link>
          </div>

          {/* Article Header */}
          <header className="mb-12 space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
              {maskedTitle}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              {maskedAuthor && (
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{maskedAuthor}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <time>{formattedDate}</time>
              </div>
            </div>

            {/* Tags */}
            {safeTags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {safeTags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {maskSubstrateNames(String(tag))}
                  </Badge>
                ))}
              </div>
            )}
          </header>

          {/* Article Content - masking happens in MarkdownRenderer */}
          <div className="prose prose-lg prose-invert max-w-none">
            <MarkdownRenderer content={safeContent} />
          </div>
        </div>
      </article>
    </div>
  );
}
