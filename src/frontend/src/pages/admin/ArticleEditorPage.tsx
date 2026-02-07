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
import { maskSubstrateNames } from '@/utils/layerMask';

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
      toast.success(`Template "${maskSubstrateNames(template.title)}" loaded`);
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
      if (isEditMode && article) {
        await updateArticle.mutateAsync({ id: article.id, update: articleUpdate });
        toast.success('Article updated successfully');
      } else {
        const result = await createArticle.mutateAsync({ slug: slug.trim(), update: articleUpdate });
        toast.success('Article created successfully');
        navigate({ to: '/admin/articles/$id', params: { id: result.id.toString() } });
      }
    } catch (error: any) {
      console.error('Error saving article:', error);
      toast.error(error.message || 'Failed to save article');
    }
  };

  const handlePublish = async () => {
    if (!article) return;

    try {
      await publishArticle.mutateAsync({ id: article.id, published: !published });
      setPublished(!published);
      toast.success(published ? 'Article unpublished' : 'Article published');
    } catch (error: any) {
      console.error('Error publishing article:', error);
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

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate({ to: '/admin' })}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <div>
              <h1 className="text-4xl font-bold tracking-tight">
                {isEditMode ? 'Edit Article' : 'New Article'}
              </h1>
              {isEditMode && article && (
                <p className="text-sm text-muted-foreground mt-1">
                  Editing: {maskSubstrateNames(article.title)}
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            {isEditMode && (
              <div className="flex items-center gap-2">
                <Label htmlFor="publish-toggle" className="text-sm">
                  {published ? 'Published' : 'Draft'}
                </Label>
                <Switch
                  id="publish-toggle"
                  checked={published}
                  onCheckedChange={handlePublish}
                  disabled={publishArticle.isPending}
                />
              </div>
            )}
            <Button
              onClick={handleSave}
              disabled={createArticle.isPending || updateArticle.isPending}
            >
              {(createArticle.isPending || updateArticle.isPending) ? (
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

        {/* Template Selector (only for new articles) */}
        {!isEditMode && (
          <Card>
            <CardHeader>
              <CardTitle>Start from Template</CardTitle>
              <CardDescription>
                Choose a template to pre-fill the article fields
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Select value={selectedTemplate} onValueChange={handleTemplateSelect}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a template..." />
                </SelectTrigger>
                <SelectContent>
                  {articleTemplates.map((template) => (
                    <SelectItem key={template.slug} value={template.slug}>
                      {maskSubstrateNames(template.title)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        )}

        {/* Editor Tabs */}
        <Tabs defaultValue="edit" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="edit">Edit</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>

          <TabsContent value="edit" className="space-y-6 mt-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter article title"
              />
            </div>

            <SlugField
              value={slug}
              onChange={setSlug}
              existingSlugs={existingSlugs}
              currentSlug={article?.slug}
              disabled={isEditMode}
            />

            <div className="space-y-2">
              <Label htmlFor="author">Author</Label>
              <Input
                id="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Enter author name (optional)"
              />
            </div>

            <TagEditor tags={tags} onChange={setTags} />

            <div className="space-y-2">
              <Label htmlFor="content">Content * (Markdown)</Label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your article content in Markdown..."
                className="min-h-[500px] font-mono"
              />
            </div>
          </TabsContent>

          <TabsContent value="preview" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>{maskSubstrateNames(title) || 'Untitled'}</CardTitle>
                {author && (
                  <CardDescription>By {maskSubstrateNames(author)}</CardDescription>
                )}
              </CardHeader>
              <CardContent>
                <MarkdownRenderer content={content} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
