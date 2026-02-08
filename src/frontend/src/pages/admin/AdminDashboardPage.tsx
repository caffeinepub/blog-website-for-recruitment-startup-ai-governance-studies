import { useListAllArticlesAdmin, useBulkRecreateDefaultArticles, useCreateOrUpdateAndPublishTemplate } from '../../hooks/useQueries';
import { useDeleteArticle, usePublishArticle } from '../../hooks/useQueries';
import { Link, useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Plus, Edit, Trash2, Eye, EyeOff, Loader2, RefreshCw, Upload, ExternalLink } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';
import type { Article } from '../../backend';
import { timestampToDate } from '../../utils/articleDate';
import { articleTemplates } from '../../content/articleTemplates';
import { useState } from 'react';
import { maskSubstrateNames } from '@/utils/layerMask';
import FriendlyErrorState from '@/components/shared/FriendlyErrorState';
import { classifyBackendError } from '@/utils/backendError';

export default function AdminDashboardPage() {
  const { data: articles = [], isLoading, error, refetch } = useListAllArticlesAdmin();
  const deleteArticle = useDeleteArticle();
  const publishArticle = usePublishArticle();
  const bulkRecreate = useBulkRecreateDefaultArticles();
  const createOrUpdateTemplate = useCreateOrUpdateAndPublishTemplate();
  const navigate = useNavigate();
  const [processingTemplate, setProcessingTemplate] = useState<string | null>(null);

  const handleDelete = async (id: bigint) => {
    try {
      await deleteArticle.mutateAsync(id);
      toast.success('Article deleted successfully');
    } catch (error) {
      toast.error('Failed to delete article');
      console.error('Delete error:', error);
    }
  };

  const handleTogglePublish = async (article: Article) => {
    try {
      await publishArticle.mutateAsync({
        id: article.id,
        published: !article.published,
      });
      toast.success(
        article.published ? 'Article unpublished' : 'Article published'
      );
    } catch (error) {
      toast.error('Failed to update article status');
      console.error('Publish toggle error:', error);
    }
  };

  const handleBulkRecreate = async () => {
    try {
      await bulkRecreate.mutateAsync();
      toast.success('All template articles recreated successfully', {
        action: {
          label: 'View Articles',
          onClick: () => navigate({ to: '/articles' }),
        },
      });
    } catch (error) {
      toast.error('Failed to recreate template articles');
      console.error('Bulk recreate error:', error);
    }
  };

  const handlePublishTemplate = async (slug: string) => {
    setProcessingTemplate(slug);
    try {
      // Find the template to get all its data
      const template = articleTemplates.find(t => t.slug === slug);
      if (!template) {
        throw new Error('Template not found');
      }

      await createOrUpdateTemplate.mutateAsync({
        slug: template.slug,
        title: template.title,
        content: template.content,
        author: template.author,
        tags: template.tags,
      });
      
      toast.success('Template article published successfully', {
        action: {
          label: 'View Article',
          onClick: () => navigate({ to: '/articles/$slug', params: { slug } }),
        },
      });
    } catch (error) {
      toast.error('Failed to publish template article');
      console.error('Template publish error:', error);
    } finally {
      setProcessingTemplate(null);
    }
  };

  const formatDate = (timestamp: bigint): string => {
    const date = timestampToDate(timestamp);
    if (!date) return 'Invalid date';
    return format(date, 'MMM d, yyyy');
  };

  const classifiedError = error ? classifyBackendError(error) : null;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Article Management
            </h1>
            <p className="text-muted-foreground mt-2">
              Manage your blog articles and templates
            </p>
          </div>
          <Link to="/admin/articles/new">
            <Button className="interactive-element">
              <Plus className="mr-2 h-4 w-4" />
              New Article
            </Button>
          </Link>
        </div>

        {/* Template Publishing Section */}
        <div className="bg-card border border-border rounded-lg p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-foreground">Template Articles</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Publish pre-written template articles to your blog
              </p>
            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  disabled={bulkRecreate.isPending}
                  className="interactive-element"
                >
                  {bulkRecreate.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Publishing...
                    </>
                  ) : (
                    <>
                      <Upload className="mr-2 h-4 w-4" />
                      Publish All Templates
                    </>
                  )}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-card border-border">
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-foreground">Publish all template articles?</AlertDialogTitle>
                  <AlertDialogDescription className="text-muted-foreground">
                    This will create or update all {articleTemplates.length} template articles and publish them to your blog.
                    Existing articles with matching slugs will be updated.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleBulkRecreate}>
                    Publish All
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>

          <div className="grid gap-3">
            {articleTemplates.map((template) => {
              const existingArticle = articles.find(a => a.slug === template.slug);
              const isProcessing = processingTemplate === template.slug;
              
              return (
                <div
                  key={template.slug}
                  className="flex items-center justify-between p-4 bg-background border border-border rounded-md"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="font-medium text-foreground">{maskSubstrateNames(template.title)}</h3>
                      {existingArticle && (
                        <Badge variant={existingArticle.published ? 'default' : 'secondary'}>
                          {existingArticle.published ? 'Published' : 'Draft'}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {template.tags.join(', ')}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {existingArticle && (
                      <Link to="/articles/$slug" params={{ slug: template.slug }}>
                        <Button variant="ghost" size="sm">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </Link>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePublishTemplate(template.slug)}
                      disabled={isProcessing || createOrUpdateTemplate.isPending}
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Publishing...
                        </>
                      ) : (
                        <>
                          <Upload className="mr-2 h-4 w-4" />
                          {existingArticle ? 'Update' : 'Publish'}
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Error State */}
        {error && (
          <FriendlyErrorState
            title="Unable to load articles"
            message={classifiedError?.userMessage || 'Failed to load articles from the backend.'}
            technicalDetails={classifiedError?.technicalDetails}
            onRetry={() => refetch()}
            retryLabel="Retry"
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

        {/* Articles Table */}
        {!isLoading && !error && (
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            {articles.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No articles yet. Create your first article!</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className="border-border hover:bg-muted/50">
                    <TableHead className="text-foreground">Title</TableHead>
                    <TableHead className="text-foreground">Status</TableHead>
                    <TableHead className="text-foreground">Tags</TableHead>
                    <TableHead className="text-foreground">Date</TableHead>
                    <TableHead className="text-right text-foreground">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {articles.map((article) => (
                    <TableRow key={Number(article.id)} className="border-border hover:bg-muted/50">
                      <TableCell className="font-medium text-foreground">
                        {maskSubstrateNames(article.title)}
                      </TableCell>
                      <TableCell>
                        <Badge variant={article.published ? 'default' : 'secondary'}>
                          {article.published ? 'Published' : 'Draft'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {article.tags.slice(0, 2).map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {article.tags.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{article.tags.length - 2}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {formatDate(article.timestamp)}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleTogglePublish(article)}
                            disabled={publishArticle.isPending}
                            title={article.published ? 'Unpublish' : 'Publish'}
                          >
                            {article.published ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                          <Link
                            to="/admin/articles/$id"
                            params={{ id: String(article.id) }}
                          >
                            <Button variant="ghost" size="sm" title="Edit">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </Link>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                disabled={deleteArticle.isPending}
                                title="Delete"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="bg-card border-border">
                              <AlertDialogHeader>
                                <AlertDialogTitle className="text-foreground">Delete article?</AlertDialogTitle>
                                <AlertDialogDescription className="text-muted-foreground">
                                  This action cannot be undone. This will permanently delete the article.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDelete(article.id)}
                                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
