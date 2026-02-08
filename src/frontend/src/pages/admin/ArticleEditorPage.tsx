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
import ArticleAttachmentsEditor from '../../components/admin/ArticleAttachmentsEditor';

export default function ArticleEditorPage() {
  const navigate = useNavigate();
  const { id } = useParams({ strict: false });
  const isEditMode = !!id;

  const { data: article, isLoading: articleLoading } = useGetArticleById(id || null);
  const { data: existingSlugs = [], isLoading: slugsLoading } = useGetAllSlugsAdmin();
  const createMutation = useCreateArticle();
  const updateMutation = useUpdateArticle();
  const publishMutation = usePublishArticle();

  const [slug, setSlug] = useState('');
  const [title, setTitle] = useState('');
  const [textContent, setTextContent] = useState('');
  const [author, setAuthor] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [published, setPublished] = useState(false);
  const [isSlugValid, setIsSlugValid] = useState(false);

  useEffect(() => {
    if (article && isEditMode) {
      setSlug(String(article.slug || ''));
      setTitle(String(article.title || ''));
      setTextContent(String(article.textContent || ''));
      setAuthor(String(article.author || ''));
      setTags(Array.isArray(article.tags) ? article.tags.map(String) : []);
      setPublished(Boolean(article.published));
    }
  }, [article, isEditMode]);

  const handleSave = async () => {
    if (!title.trim()) {
      toast.error('Title is required');
      return;
    }

    if (!isEditMode && !slug.trim()) {
      toast.error('Slug is required');
      return;
    }

    if (!isEditMode && !isSlugValid) {
      toast.error('Please fix slug validation errors');
      return;
    }

    const update: ArticleUpdate = {
      title: title.trim(),
      textContent: textContent.trim(),
      author: author.trim() || undefined,
      tags,
    };

    try {
      if (isEditMode && article) {
        await updateMutation.mutateAsync({ id: article.id, update });
        toast.success('Article updated successfully');
      } else {
        const newArticle = await createMutation.mutateAsync({ slug: slug.trim(), update });
        toast.success('Article created successfully');
        navigate({ to: `/admin/articles/${newArticle.id}` });
      }
    } catch (error: any) {
      const errorMessage = error?.message || 'An error occurred';
      if (errorMessage.includes('Duplicate slug')) {
        toast.error('This slug is already in use. Please choose a different one.');
      } else {
        toast.error(`Failed to save article: ${errorMessage}`);
      }
    }
  };

  const handlePublishToggle = async () => {
    if (!article) return;

    try {
      await publishMutation.mutateAsync({ id: article.id, published: !published });
      setPublished(!published);
      toast.success(published ? 'Article unpublished' : 'Article published');
    } catch (error: any) {
      toast.error(`Failed to ${published ? 'unpublish' : 'publish'} article: ${error?.message || 'Unknown error'}`);
    }
  };

  const isSaving = createMutation.isPending || updateMutation.isPending;
  const isPublishing = publishMutation.isPending;
  const isLoading = articleLoading || slugsLoading;

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-center min-h-[40vh]">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </div>
    );
  }

  const canSave = isEditMode ? true : (title.trim() && slug.trim() && isSlugValid);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight">
              {isEditMode ? 'Edit Article' : 'Create New Article'}
            </h1>
            <p className="text-sm text-muted-foreground">
              {isEditMode ? 'Update article content and settings' : 'Write and publish a new article'}
            </p>
          </div>
          <Button variant="ghost" onClick={() => navigate({ to: '/admin' })}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Admin
          </Button>
        </div>

        {/* Editor Tabs */}
        <Tabs defaultValue="edit" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="edit">Edit</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="attachments">Attachments</TabsTrigger>
          </TabsList>

          {/* Edit Tab */}
          <TabsContent value="edit" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Article Details</CardTitle>
                <CardDescription>Basic information about your article</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Slug Field */}
                <SlugField
                  value={slug}
                  onChange={setSlug}
                  existingSlugs={existingSlugs}
                  currentSlug={isEditMode ? article?.slug : undefined}
                  disabled={isEditMode}
                  onValidationChange={setIsSlugValid}
                />

                {/* Title */}
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Article title"
                  />
                </div>

                {/* Author */}
                <div className="space-y-2">
                  <Label htmlFor="author">Author (optional)</Label>
                  <Input
                    id="author"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="Author name"
                  />
                </div>

                {/* Tags */}
                <div className="space-y-2">
                  <Label>Tags</Label>
                  <TagEditor tags={tags} onChange={setTags} />
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <Label htmlFor="content">Content (Markdown)</Label>
                  <Textarea
                    id="content"
                    value={textContent}
                    onChange={(e) => setTextContent(e.target.value)}
                    placeholder="Write your article content in Markdown..."
                    className="min-h-[400px] font-mono text-sm"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {isEditMode && (
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="published"
                      checked={published}
                      onCheckedChange={handlePublishToggle}
                      disabled={isPublishing}
                    />
                    <Label htmlFor="published" className="cursor-pointer">
                      {published ? 'Published' : 'Draft'}
                    </Label>
                  </div>
                )}
              </div>
              <Button onClick={handleSave} disabled={isSaving || !canSave}>
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    {isEditMode ? 'Update Article' : 'Create Article'}
                  </>
                )}
              </Button>
            </div>
          </TabsContent>

          {/* Preview Tab */}
          <TabsContent value="preview">
            <Card>
              <CardHeader>
                <CardTitle>{title || 'Untitled Article'}</CardTitle>
                {author && <CardDescription>By {author}</CardDescription>}
              </CardHeader>
              <CardContent>
                <article className="prose prose-lg dark:prose-invert max-w-none">
                  <MarkdownRenderer content={textContent} />
                </article>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Attachments Tab */}
          <TabsContent value="attachments">
            {isEditMode && article ? (
              <ArticleAttachmentsEditor articleId={article.id} article={article} />
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Attachments</CardTitle>
                  <CardDescription>Save the article first to add attachments</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    You need to create the article before you can add PDF or text file attachments.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
