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

export default function AdminDashboardPage() {
  const { data: articles = [], isLoading, error } = useListAllArticlesAdmin();
  const deleteArticle = useDeleteArticle();
  const publishArticle = usePublishArticle();
  const bulkRecreate = useBulkRecreateDefaultArticles();
  const createOrUpdateTemplate = useCreateOrUpdateAndPublishTemplate();
  const navigate = useNavigate();
  const [processingTemplate, setProcessingTemplate] = useState<string | null>(null);

  const handleDelete = async (id: bigint, title: string) => {
    try {
      await deleteArticle.mutateAsync(id);
      toast.success(`Article "${maskSubstrateNames(title)}" deleted successfully`);
    } catch (error: any) {
      console.error('Error deleting article:', error);
      toast.error(error.message || 'Failed to delete article');
    }
  };

  const handleTogglePublish = async (article: Article) => {
    try {
      await publishArticle.mutateAsync({ id: article.id, published: !article.published });
      toast.success(
        article.published ? 'Article unpublished successfully' : 'Article published successfully'
      );
    } catch (error: any) {
      console.error('Error toggling publish status:', error);
      toast.error(error.message || 'Failed to update article status');
    }
  };

  const handleBulkRecreate = async () => {
    try {
      await bulkRecreate.mutateAsync();
      toast.success('Default articles recreated and published successfully', {
        description: 'All template articles are now live on the public Articles page.',
        action: {
          label: 'View Articles',
          onClick: () => navigate({ to: '/articles' }),
        },
      });
    } catch (error: any) {
      console.error('Error recreating default articles:', error);
      toast.error(error.message || 'Failed to recreate default articles');
    }
  };

  const handlePublishTemplate = async (template: typeof articleTemplates[0]) => {
    setProcessingTemplate(template.slug);
    try {
      const result = await createOrUpdateTemplate.mutateAsync({
        slug: template.slug,
        title: template.title,
        content: template.content,
        author: template.author,
        tags: template.tags,
      });
      
      const action = result.action === 'created' ? 'created and published' : 'updated and published';
      toast.success(`Article "${maskSubstrateNames(template.title)}" ${action} successfully`, {
        description: 'The article is now live on the public Articles page.',
        action: {
          label: 'View Article',
          onClick: () => navigate({ to: '/articles/$slug', params: { slug: template.slug } }),
        },
      });
    } catch (error: any) {
      console.error('Error publishing template:', error);
      toast.error(error.message || `Failed to publish "${maskSubstrateNames(template.title)}"`);
    } finally {
      setProcessingTemplate(null);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-center min-h-[40vh]">
          <div className="text-center space-y-4">
            <Loader2 className="h-8 w-8 animate-spin mx-auto text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Loading dashboard...</p>
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
            <p className="text-destructive font-medium">Error loading dashboard</p>
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
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Admin Dashboard</h1>
            <p className="text-muted-foreground mt-2">Manage your articles and content</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleBulkRecreate}
              disabled={bulkRecreate.isPending}
            >
              {bulkRecreate.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Recreating...
                </>
              ) : (
                <>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Recreate & Publish All
                </>
              )}
            </Button>
            <Link to="/admin/articles/new">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Article
              </Button>
            </Link>
          </div>
        </div>

        {/* Default Article Templates Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">Default Article Templates</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Create or update and publish individual templates
              </p>
            </div>
          </div>
          
          <div className="border border-border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead>Tags</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {articleTemplates.map((template) => {
                  const isProcessing = processingTemplate === template.slug;
                  const existingArticle = articles.find(a => a.slug === template.slug);
                  
                  return (
                    <TableRow key={template.slug}>
                      <TableCell className="font-medium">{maskSubstrateNames(template.title)}</TableCell>
                      <TableCell className="font-mono text-sm text-muted-foreground">
                        {template.slug}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {template.tags.slice(0, 2).map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {maskSubstrateNames(tag)}
                            </Badge>
                          ))}
                          {template.tags.length > 2 && (
                            <Badge variant="secondary" className="text-xs">
                              +{template.tags.length - 2}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          {existingArticle && (
                            <Badge variant={existingArticle.published ? "default" : "secondary"}>
                              {existingArticle.published ? "Published" : "Draft"}
                            </Badge>
                          )}
                          <Button
                            size="sm"
                            onClick={() => handlePublishTemplate(template)}
                            disabled={isProcessing}
                          >
                            {isProcessing ? (
                              <>
                                <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                                Processing...
                              </>
                            ) : (
                              <>
                                <Upload className="mr-2 h-3 w-3" />
                                {existingArticle ? 'Update & Publish' : 'Create & Publish'}
                              </>
                            )}
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* All Articles Section */}
        <div className="space-y-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">All Articles</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Manage all articles in the system
            </p>
          </div>

          {articles.length === 0 ? (
            <div className="text-center py-12 border border-dashed border-border rounded-lg">
              <p className="text-muted-foreground mb-4">No articles yet. Create your first one!</p>
              <div className="flex gap-2 justify-center">
                <Button
                  variant="outline"
                  onClick={handleBulkRecreate}
                  disabled={bulkRecreate.isPending}
                >
                  {bulkRecreate.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Recreating...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Recreate Default Articles
                    </>
                  )}
                </Button>
                <Link to="/admin/articles/new">
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Article
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="border border-border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Slug</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {articles.map((article) => {
                    const date = timestampToDate(article.timestamp);
                    const formattedDate = date ? format(date, 'MMM d, yyyy') : 'Invalid date';

                    return (
                      <TableRow key={article.id.toString()}>
                        <TableCell className="font-medium">{maskSubstrateNames(article.title)}</TableCell>
                        <TableCell className="font-mono text-sm text-muted-foreground">
                          {article.slug}
                        </TableCell>
                        <TableCell>
                          <Badge variant={article.published ? 'default' : 'secondary'}>
                            {article.published ? 'Published' : 'Draft'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {formattedDate}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center justify-end gap-2">
                            <Link
                              to="/admin/articles/$id"
                              params={{ id: article.id.toString() }}
                            >
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </Link>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleTogglePublish(article)}
                              disabled={publishArticle.isPending}
                            >
                              {article.published ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <Trash2 className="h-4 w-4 text-destructive" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Delete Article</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to delete "{maskSubstrateNames(article.title)}"? This action
                                    cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleDelete(article.id, article.title)}
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
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
