import { Link } from '@tanstack/react-router';
import { Badge } from '@/components/ui/badge';
import { Calendar } from 'lucide-react';
import { format } from 'date-fns';
import type { Article } from '../../backend';

interface ArticlesListProps {
  articles: Article[];
}

export default function ArticlesList({ articles }: ArticlesListProps) {
  return (
    <div className="space-y-6">
      {articles.map((article) => {
        const publishDate = new Date(Number(article.timestamp) / 1000000);
        const excerpt = article.content.slice(0, 200).replace(/[#*`]/g, '') + '...';

        return (
          <Link
            key={article.id.toString()}
            to="/articles/$slug"
            params={{ slug: article.slug }}
            className="block group"
          >
            <article className="p-6 rounded-lg border border-border bg-card hover:border-primary/50 transition-colors">
              <div className="space-y-3">
                <h2 className="text-2xl font-bold group-hover:text-primary transition-colors">
                  {article.title}
                </h2>

                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <time dateTime={publishDate.toISOString()}>
                      {format(publishDate, 'MMMM d, yyyy')}
                    </time>
                  </div>
                  {article.author && <span>By {article.author}</span>}
                </div>

                <p className="text-muted-foreground line-clamp-3">{excerpt}</p>

                {article.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {article.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </article>
          </Link>
        );
      })}
    </div>
  );
}
