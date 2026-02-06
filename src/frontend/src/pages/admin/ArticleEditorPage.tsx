import { useState, useEffect } from 'react';
import { useNavigate, useParams } from '@tanstack/react-router';
import {
  useCreateArticle,
  useUpdateArticle,
  usePublishArticle,
  useGetArticleById,
  useGetAllSlugsAdmin,
} from '../../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Save, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import type { ArticleUpdate } from '../../backend';
import SlugField from '../../components/admin/SlugField';
import TagEditor from '../../components/admin/TagEditor';
import MarkdownRenderer from '../../components/content/MarkdownRenderer';
import { articleTemplates } from '../../content/articleTemplates';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function ArticleEditorPage() {
  const navigate = useNavigate();
  const params = useParams({ strict: false });
  const articleId = params.id || null;
  const isEditMode = articleId !== null;

  const { data: article, isLoading: articleLoading } = useGetArticleById(articleId);
  const { data: existingSlugs = [] } = useGetAllSlugsAdmin();
  const createArticle = useCreateArticle();
  const updateArticle = useUpdateArticle();
  const publishArticle = usePublishArticle();

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [published, setPublished] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');

  // Load article data in edit mode
  useEffect(() => {
    if (article) {
      setTitle(article.title);
      setSlug(article.slug);
      setContent(article.content);
      setAuthor(article.author || '');
      setTags(article.tags);
      setPublished(article.published);
    }
  }, [article]);

  // Load template when selected
  const handleTemplateSelect = (templateSlug: string) => {
    if (!templateSlug) return;
    
    const template = articleTemplates.find(t => t.slug === templateSlug);
    if (template) {
      setTitle(template.title);
      setSlug(template.slug);
      setContent(template.content);
      setAuthor(template.author || '');
      setTags(template.tags);
      setSelectedTemplate(templateSlug);
      toast.success(`Template "${template.title}" loaded`);
    }
  };

  const handleSave = async () => {
    if (!title.trim() || !slug.trim() || !content.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    const articleUpdate: ArticleUpdate = {
      title: title.trim(),
      content: content.trim(),
      author: author.trim() || undefined,
      tags,
    };

    try {
      if (isEditMode && articleId) {
        await updateArticle.mutateAsync({ id: BigInt(articleId), update: articleUpdate });
        toast.success('Article updated successfully');
      } else {
        const newArticle = await createArticle.mutateAsync({ slug: slug.trim(), update: articleUpdate });
        toast.success('Article created successfully');
        // Navigate to edit mode for the newly created article
        if (newArticle && newArticle.id) {
          navigate({ to: '/admin/articles/$id', params: { id: newArticle.id.toString() } });
        } else {
          // Fallback: navigate to dashboard
          navigate({ to: '/admin' });
        }
      }
    } catch (error: any) {
      console.error('Error saving article:', error);
      toast.error(error.message || 'Failed to save article');
    }
  };

  const handleTogglePublish = async () => {
    if (!isEditMode || !articleId) {
      toast.error('Please save the article before publishing');
      return;
    }

    try {
      await publishArticle.mutateAsync({ id: BigInt(articleId), published: !published });
      setPublished(!published);
      toast.success(published ? 'Article unpublished' : 'Article published');
    } catch (error: any) {
      console.error('Error toggling publish status:', error);
      toast.error(error.message || 'Failed to update publish status');
    }
  };

  if (articleLoading) {
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

  const isSaving = createArticle.isPending || updateArticle.isPending;
  const isPublishing = publishArticle.isPending;

  // Filter out current article's slug from existing slugs check
  const slugsToCheck = isEditMode && article ? existingSlugs.filter(s => s !== article.slug) : existingSlugs;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => navigate({ to: '/admin' })}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-4xl font-bold tracking-tight">
                {isEditMode ? 'Edit Article' : 'Create Article'}
              </h1>
              <p className="text-muted-foreground mt-2">
                {isEditMode ? 'Update your article content' : 'Write a new article'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {isEditMode && (
              <div className="flex items-center gap-2">
                <Label htmlFor="publish-toggle" className="text-sm font-medium">
                  {published ? 'Published' : 'Draft'}
                </Label>
                <Switch
                  id="publish-toggle"
                  checked={published}
                  onCheckedChange={handleTogglePublish}
                  disabled={isPublishing}
                />
              </div>
            )}
            <Button onClick={handleSave} disabled={isSaving}>
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Template Selector (only in create mode) */}
        {!isEditMode && (
          <Card>
            <CardHeader>
              <CardTitle>Start from a Template</CardTitle>
              <CardDescription>
                Choose a predefined template to get started quickly
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Select value={selectedTemplate} onValueChange={handleTemplateSelect}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a template (optional)" />
                </SelectTrigger>
                <SelectContent>
                  {articleTemplates.map((template) => (
                    <SelectItem key={template.slug} value={template.slug}>
                      {template.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        )}

        {/* Editor */}
        <Tabs defaultValue="edit" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="edit">Edit</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>

          <TabsContent value="edit" className="space-y-6 mt-6">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter article title"
              />
            </div>

            {/* Slug */}
            <SlugField
              value={slug}
              onChange={setSlug}
              existingSlugs={slugsToCheck}
              disabled={isEditMode}
            />

            {/* Author */}
            <div className="space-y-2">
              <Label htmlFor="author">Author</Label>
              <Input
                id="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Enter author name (optional)"
              />
            </div>

            {/* Tags */}
            <TagEditor tags={tags} onChange={setTags} />

            {/* Content */}
            <div className="space-y-2">
              <Label htmlFor="content">Content * (Markdown supported)</Label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your article content in Markdown..."
                className="min-h-[400px] font-mono text-sm"
              />
            </div>
          </TabsContent>

          <TabsContent value="preview" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>{title || 'Untitled Article'}</CardTitle>
                {author && <CardDescription>By {author}</CardDescription>}
              </CardHeader>
              <CardContent>
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <MarkdownRenderer content={content} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
