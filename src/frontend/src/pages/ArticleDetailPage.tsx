import { useParams, Link } from '@tanstack/react-router';
import { useGetPublicArticleBySlug } from '../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Calendar, User, Loader2, Share2, Check } from 'lucide-react';
import { SiX, SiLinkedin } from 'react-icons/si';
import MarkdownRenderer from '../components/content/MarkdownRenderer';
import { format } from 'date-fns';
import { getTemplateArticleBySlug } from '../utils/templateArticles';
import { classifyBackendError } from '../utils/backendError';
import FriendlyErrorState from '../components/shared/FriendlyErrorState';
import { useState } from 'react';

export default function ArticleDetailPage() {
  const { slug } = useParams({ strict: false });
  const { data: article, isLoading, error, isFetched, refetch } = useGetPublicArticleBySlug(slug || '');
  const [copied, setCopied] = useState(false);

  // Fallback to template if article not found or backend error
  const templateArticle = getTemplateArticleBySlug(slug || '');
  const displayArticle = article || templateArticle;

  const handleCopyLink = async () => {
    const url = window.location.href;
    
    // Try modern clipboard API first
    if (navigator.clipboard && navigator.clipboard.writeText) {
      try {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        return;
      } catch (err) {
        // Fall through to fallback
      }
    }
    
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = url;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
    document.body.removeChild(textArea);
  };

  const handleShare = (platform: 'twitter' | 'linkedin') => {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(displayArticle?.title || '');
    
    if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?url=${url}&text=${title}`, '_blank');
    } else if (platform === 'linkedin') {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-foreground" />
      </div>
    );
  }

  // Show error state only if backend failed AND no template fallback
  if (error && !templateArticle && isFetched) {
    const errorInfo = classifyBackendError(error);
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <FriendlyErrorState
          title="Article Not Found"
          message={errorInfo.userMessage}
          technicalDetails={errorInfo.technicalDetails}
          onRetry={refetch}
        />
      </div>
    );
  }

  if (!displayArticle) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-foreground">Article not found</h1>
          <Link to="/articles">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Articles
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const formattedDate = displayArticle.timestamp
    ? format(new Date(Number(displayArticle.timestamp) / 1000000), 'MMMM d, yyyy')
    : 'Date unavailable';

  return (
    <div className="min-h-screen bg-background">
      {/* Article Header */}
      <header className="border-b border-seafoam bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-4xl mx-auto space-y-6">
            <Link to="/articles">
              <Button variant="ghost" size="sm" className="text-foreground hover:text-foreground">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Articles
              </Button>
            </Link>

            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {displayArticle.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-foreground">
                    {tag}
                  </Badge>
                ))}
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
                {displayArticle.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-sm text-foreground">
                <span className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {formattedDate}
                </span>
                {displayArticle.author && (
                  <span className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    {displayArticle.author}
                  </span>
                )}
              </div>

              {/* Share Buttons */}
              <div className="flex flex-wrap gap-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopyLink}
                  className="text-foreground hover:text-foreground"
                >
                  {copied ? (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Share2 className="mr-2 h-4 w-4" />
                      Copy Link
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleShare('twitter')}
                  className="text-foreground hover:text-foreground"
                >
                  <SiX className="mr-2 h-4 w-4" />
                  Share on X
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleShare('linkedin')}
                  className="text-foreground hover:text-foreground"
                >
                  <SiLinkedin className="mr-2 h-4 w-4" />
                  Share on LinkedIn
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Article Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none">
            <MarkdownRenderer content={displayArticle.textContent} />
          </div>
        </article>
      </main>
    </div>
  );
}
