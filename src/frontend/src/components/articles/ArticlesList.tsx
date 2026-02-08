import { Link } from '@tanstack/react-router';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, User, Plus } from 'lucide-react';
import type { Article } from '@/backend';
import { formatTimestampSafe } from '@/utils/articleDate';
import { simplifyUserFacingText } from '@/utils/textTransforms';
import AdminArticleCardControls from './AdminArticleCardControls';
import AddArticleCard from './AddArticleCard';

interface ArticlesListProps {
  articles: Article[];
  isAdmin?: boolean;
}

export default function ArticlesList({ articles, isAdmin = false }: ArticlesListProps) {
  const generateExcerpt = (content: string, maxLength: number = 150): string => {
    const safeContent = content ? String(content) : '';
    const plainText = safeContent
      .replace(/[#*`_\[\]()]/g, '')
      .replace(/\n+/g, ' ')
      .trim();
    
    if (plainText.length <= maxLength) return plainText;
    return plainText.substring(0, maxLength).trim() + '...';
  };

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {/* Add Article Card (admin only) */}
      {isAdmin && <AddArticleCard />}

      {/* Article Cards */}
      {articles.map((article) => {
        const safeSlug = article.slug ? String(article.slug) : '';
        const safeTitle = article.title ? String(article.title) : 'Untitled';
        const safeContent = article.textContent ? String(article.textContent) : '';
        const safeAuthor = article.author ? String(article.author) : null;
        const safeTags = Array.isArray(article.tags) ? article.tags : [];
        const safeTimestamp = article.timestamp != null ? article.timestamp : null;

        if (!safeSlug) {
          console.warn('Article missing slug, skipping:', article);
          return null;
        }

        // Apply text transformations (masking + simplification)
        const displayTitle = simplifyUserFacingText(safeTitle);
        const displayAuthor = safeAuthor ? simplifyUserFacingText(safeAuthor) : null;
        const displayExcerpt = simplifyUserFacingText(generateExcerpt(safeContent));
        const displayTags = safeTags.map(tag => simplifyUserFacingText(String(tag)));

        const formattedDate = formatTimestampSafe(
          safeTimestamp,
          (date) => {
            const options: Intl.DateTimeFormatOptions = { 
              year: 'numeric', 
              month: 'short', 
              day: 'numeric' 
            };
            return date.toLocaleDateString('en-US', options);
          },
          'Date unavailable'
        );

        return (
          <div key={safeSlug} className="relative">
            <Link to="/articles/$slug" params={{ slug: safeSlug }}>
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="line-clamp-2">{displayTitle}</CardTitle>
                  <CardDescription className="space-y-2">
                    <div className="flex items-center gap-4 text-xs">
                      {displayAuthor && (
                        <span className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {displayAuthor}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formattedDate}
                      </span>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {displayExcerpt}
                  </p>
                  {displayTags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {displayTags.slice(0, 3).map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {displayTags.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{displayTags.length - 3}
                        </Badge>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </Link>
            {/* Admin Controls Overlay */}
            {isAdmin && (
              <AdminArticleCardControls articleId={article.id} articleSlug={safeSlug} />
            )}
          </div>
        );
      })}
    </div>
  );
}
