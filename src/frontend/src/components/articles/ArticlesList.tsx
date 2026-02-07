import { Link } from '@tanstack/react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, User } from 'lucide-react';
import type { Article } from '../../backend';
import { formatTimestampSafe } from '../../utils/articleDate';
import { maskSubstrateNames } from '@/utils/layerMask';

interface ArticlesListProps {
  articles: Article[];
}

function stripMarkdownForExcerpt(markdown: string): string {
  return markdown
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, '') // Remove images ![alt](url)
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Replace links [text](url) with just text
    .replace(/[#*_~`]/g, '') // Remove markdown formatting characters
    .replace(/\n+/g, ' ') // Replace newlines with spaces
    .trim();
}

export default function ArticlesList({ articles }: ArticlesListProps) {
  if (articles.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No articles found.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {articles.map((article) => {
        // Defensive field access with safe defaults
        const slug = String(article.slug || '');
        const title = String(article.title || 'Untitled');
        const content = String(article.content || '');
        const tags = Array.isArray(article.tags) ? article.tags : [];
        const author = article.author ? String(article.author) : undefined;
        
        // Skip articles with invalid slugs
        if (!slug) {
          console.warn('Article missing slug:', article);
          return null;
        }

        const cleanedContent = stripMarkdownForExcerpt(content);
        const excerpt = cleanedContent.length > 150 
          ? cleanedContent.substring(0, 150) + '...' 
          : cleanedContent;

        const formattedDate = formatTimestampSafe(
          article.timestamp,
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

        // Mask substrate names in title and excerpt
        const maskedTitle = maskSubstrateNames(title);
        const maskedExcerpt = maskSubstrateNames(excerpt);

        return (
          <Link
            key={article.id.toString()}
            to="/articles/$slug"
            params={{ slug }}
            className="block h-full"
          >
            <Card className="h-full hover:border-primary/50 transition-colors cursor-pointer">
              <CardHeader>
                <CardTitle className="line-clamp-2">{maskedTitle}</CardTitle>
                <CardDescription className="line-clamp-3">
                  {maskedExcerpt || 'No preview available'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {tags.slice(0, 3).map((tag, idx) => (
                    <Badge key={`${tag}-${idx}`} variant="secondary" className="text-xs">
                      {maskSubstrateNames(String(tag))}
                    </Badge>
                  ))}
                  {tags.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{tags.length - 3}
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  {author && (
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      <span>{maskSubstrateNames(author)}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <time>{formattedDate}</time>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}
