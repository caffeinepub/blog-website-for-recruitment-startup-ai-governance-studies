import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FileText, Upload, Trash2, Loader2, Download } from 'lucide-react';
import { toast } from 'sonner';
import type { Article } from '@/backend';
import {
  useAttachPdfToArticle,
  useAttachTextFileToArticle,
  useRemovePdfFromArticle,
  useRemoveTextFileFromArticle,
} from '@/hooks/useQueries';
import { fileToExternalBlob, isPdfFile, isTextFile } from '@/utils/fileToExternalBlob';
import { Progress } from '@/components/ui/progress';

interface ArticleAttachmentsEditorProps {
  articleId: bigint;
  article: Article;
}

export default function ArticleAttachmentsEditor({
  articleId,
  article,
}: ArticleAttachmentsEditorProps) {
  const attachPdf = useAttachPdfToArticle();
  const attachTextFile = useAttachTextFileToArticle();
  const removePdf = useRemovePdfFromArticle();
  const removeTextFile = useRemoveTextFileFromArticle();

  const [pdfUploadProgress, setPdfUploadProgress] = useState(0);
  const [textUploadProgress, setTextUploadProgress] = useState(0);

  const handlePdfUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!isPdfFile(file)) {
      toast.error('Please select a PDF file');
      return;
    }

    try {
      setPdfUploadProgress(0);
      const blob = await fileToExternalBlob(file, (percentage) => {
        setPdfUploadProgress(percentage);
      });
      
      await attachPdf.mutateAsync({ id: articleId, blob });
      toast.success('PDF attached successfully');
      setPdfUploadProgress(0);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to attach PDF');
      setPdfUploadProgress(0);
    }

    // Reset input
    e.target.value = '';
  };

  const handleTextFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!isTextFile(file)) {
      toast.error('Please select a text file (.txt or .md)');
      return;
    }

    try {
      setTextUploadProgress(0);
      const blob = await fileToExternalBlob(file, (percentage) => {
        setTextUploadProgress(percentage);
      });
      
      await attachTextFile.mutateAsync({ id: articleId, blob });
      toast.success('Text file attached successfully');
      setTextUploadProgress(0);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to attach text file');
      setTextUploadProgress(0);
    }

    // Reset input
    e.target.value = '';
  };

  const handleRemovePdf = async () => {
    try {
      await removePdf.mutateAsync(articleId);
      toast.success('PDF removed successfully');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to remove PDF');
    }
  };

  const handleRemoveTextFile = async () => {
    try {
      await removeTextFile.mutateAsync(articleId);
      toast.success('Text file removed successfully');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to remove text file');
    }
  };

  const isUploading = attachPdf.isPending || attachTextFile.isPending;
  const isRemoving = removePdf.isPending || removeTextFile.isPending;

  return (
    <div className="space-y-6">
      {/* PDF Attachment */}
      <Card>
        <CardHeader>
          <CardTitle>PDF Attachment</CardTitle>
          <CardDescription>
            Attach a PDF document to this article (optional)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {article.pdf ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <FileText className="h-8 w-8 text-primary" />
                  <div>
                    <p className="font-medium">PDF Attached</p>
                    <p className="text-sm text-muted-foreground">
                      Click to download or preview
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(article.pdf!.getDirectURL(), '_blank')}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={handleRemovePdf}
                    disabled={isRemoving}
                  >
                    {removePdf.isPending ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Trash2 className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Label htmlFor="pdf-upload" className="cursor-pointer">
                  <div className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-accent transition-colors">
                    <Upload className="h-4 w-4" />
                    <span>Choose PDF File</span>
                  </div>
                </Label>
                <Input
                  id="pdf-upload"
                  type="file"
                  accept=".pdf,application/pdf"
                  onChange={handlePdfUpload}
                  disabled={isUploading}
                  className="hidden"
                />
              </div>
              {pdfUploadProgress > 0 && pdfUploadProgress < 100 && (
                <div className="space-y-2">
                  <Progress value={pdfUploadProgress} />
                  <p className="text-sm text-muted-foreground">
                    Uploading: {pdfUploadProgress}%
                  </p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Text File Attachment */}
      <Card>
        <CardHeader>
          <CardTitle>Text File Attachment</CardTitle>
          <CardDescription>
            Attach a text or markdown file to this article (optional)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {article.textAttachment ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <FileText className="h-8 w-8 text-primary" />
                  <div>
                    <p className="font-medium">Text File Attached</p>
                    <p className="text-sm text-muted-foreground">
                      Click to download
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(article.textAttachment!.getDirectURL(), '_blank')}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={handleRemoveTextFile}
                    disabled={isRemoving}
                  >
                    {removeTextFile.isPending ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Trash2 className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Label htmlFor="text-upload" className="cursor-pointer">
                  <div className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-accent transition-colors">
                    <Upload className="h-4 w-4" />
                    <span>Choose Text File</span>
                  </div>
                </Label>
                <Input
                  id="text-upload"
                  type="file"
                  accept=".txt,.md,text/plain,text/markdown"
                  onChange={handleTextFileUpload}
                  disabled={isUploading}
                  className="hidden"
                />
              </div>
              {textUploadProgress > 0 && textUploadProgress < 100 && (
                <div className="space-y-2">
                  <Progress value={textUploadProgress} />
                  <p className="text-sm text-muted-foreground">
                    Uploading: {textUploadProgress}%
                  </p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
