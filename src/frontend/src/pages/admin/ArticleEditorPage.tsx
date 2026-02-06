import { useState, useEffect } from 'react';
import { useParams, useNavigate } from '@tanstack/react-router';
import {
  useGetArticleBySlug,
  useCreateArticle,
  useUpdateArticle,
  usePublishArticle,
  useListPublishedArticles,
} from '../../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import SlugField from '../../components/admin/SlugField';
import TagEditor from '../../components/admin/TagEditor';
import MarkdownRenderer from '../../components/content/MarkdownRenderer';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import type { ArticleUpdate } from '../../backend';

export default function ArticleEditorPage() {
  const params = useParams({ strict: false });
  const navigate = useNavigate();
  const articleId = params.id ? BigInt(params.id) : null;

  const { data: allArticles = [] } = useListPublishedArticles();
  const currentArticle = articleId ? allArticles.find((a) => a.id === articleId) : null;

  const createArticle = useCreateArticle();
  const updateArticle = useUpdateArticle();
  const publishArticle = usePublishArticle();

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [published, setPublished] = useState(false);

  // Load article data if editing
  useEffect(() => {
    if (currentArticle) {
      setTitle(currentArticle.title);
      setSlug(currentArticle.slug);
      setContent(currentArticle.content);
      setAuthor(currentArticle.author || '');
      setTags(currentArticle.tags);
      setPublished(currentArticle.published);
    }
  }, [currentArticle]);

  const handleSave = async () => {
    if (!title.trim()) {
      toast.error('Please enter a title');
      return;
    }
    if (!slug.trim()) {
      toast.error('Please enter a slug');
      return;
    }
    if (!content.trim()) {
      toast.error('Please enter content');
      return;
    }

    // Check slug uniqueness
    const slugExists = allArticles.some(
      (a) => a.slug === slug && (!articleId || a.id !== articleId)
    );
    if (slugExists) {
      toast.error('This slug is already in use. Please choose a different one.');
      return;
    }

    const update: ArticleUpdate = {
      title: title.trim(),
      content: content.trim(),
      author: author.trim() || undefined,
      tags,
    };

    try {
      if (articleId) {
        // Update existing article
        await updateArticle.mutateAsync({ id: articleId, update });
        toast.success('Article updated successfully');
      } else {
        // Create new article
        await createArticle.mutateAsync({ slug: slug.trim(), update });
        toast.success('Article created successfully');
        navigate({ to: '/admin' });
      }
    } catch (error: any) {
      console.error('Error saving article:', error);
      toast.error(error.message || 'Failed to save article');
    }
  };

  const handleTogglePublish = async () => {
    if (!articleId) {
      toast.error('Please save the article first');
      return;
    }

    try {
      await publishArticle.mutateAsync({ id: articleId, published: !published });
      setPublished(!published);
      toast.success(published ? 'Article unpublished' : 'Article published');
    } catch (error) {
      console.error('Error toggling publish status:', error);
      toast.error('Failed to update publish status');
    }
  };

  const isSaving = createArticle.isPending || updateArticle.isPending || publishArticle.isPending;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={() => navigate({ to: '/admin' })}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
          <div className="flex items-center gap-4">
            {articleId && (
              <div className="flex items-center gap-2">
                <Label htmlFor="publish-toggle">Published</Label>
                <Switch
                  id="publish-toggle"
                  checked={published}
                  onCheckedChange={handleTogglePublish}
                  disabled={isSaving}
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

        {/* Editor */}
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
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
            existingSlugs={allArticles
              .filter((a) => !articleId || a.id !== articleId)
              .map((a) => a.slug)}
            disabled={!!articleId}
          />

          <div className="space-y-2">
            <Label htmlFor="author">Author (optional)</Label>
            <Input
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Enter author name"
            />
          </div>

          <TagEditor tags={tags} onChange={setTags} />

          <Tabs defaultValue="edit" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="edit">Edit</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>
            <TabsContent value="edit" className="space-y-2">
              <Label htmlFor="content">Content (Markdown)</Label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your article content in Markdown..."
                className="min-h-[500px] font-mono"
              />
            </TabsContent>
            <TabsContent value="preview" className="min-h-[500px]">
              <div className="prose prose-lg dark:prose-invert max-w-none p-6 border border-border rounded-lg">
                {content ? (
                  <MarkdownRenderer content={content} />
                ) : (
                  <p className="text-muted-foreground">Nothing to preview yet...</p>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
