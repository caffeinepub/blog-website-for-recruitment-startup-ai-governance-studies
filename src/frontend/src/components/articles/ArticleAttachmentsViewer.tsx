import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Download, FileText } from 'lucide-react';
import MarkdownRenderer from '../content/MarkdownRenderer';
import type { ExternalBlob } from '@/backend';

interface ArticleAttachmentsViewerProps {
  textContent: string;
  pdfBlob?: ExternalBlob;
  textAttachment?: ExternalBlob;
}

export default function ArticleAttachmentsViewer({
  textContent,
  pdfBlob,
  textAttachment,
}: ArticleAttachmentsViewerProps) {
  const [activeTab, setActiveTab] = useState<'text' | 'pdf'>('text');

  const hasText = textContent.trim().length > 0;
  const hasPdf = !!pdfBlob;
  const hasTextAttachment = !!textAttachment;

  // If both text and PDF exist, show tabs
  if (hasText && hasPdf) {
    return (
      <div className="space-y-6">
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'text' | 'pdf')}>
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="text">Article Text</TabsTrigger>
            <TabsTrigger value="pdf">PDF Document</TabsTrigger>
          </TabsList>

          <TabsContent value="text" className="mt-6">
            <div className="prose prose-lg prose-invert max-w-none">
              <MarkdownRenderer content={textContent} />
            </div>
          </TabsContent>

          <TabsContent value="pdf" className="mt-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/50">
                <div className="flex items-center gap-3">
                  <FileText className="h-6 w-6 text-primary" />
                  <span className="font-medium">PDF Document</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(pdfBlob.getDirectURL(), '_blank')}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </Button>
              </div>
              <div className="border rounded-lg overflow-hidden bg-white">
                <iframe
                  src={pdfBlob.getDirectURL()}
                  className="w-full h-[800px]"
                  title="PDF Viewer"
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {hasTextAttachment && (
          <div className="mt-6 p-4 border rounded-lg bg-muted/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm font-medium">Additional Text File</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(textAttachment.getDirectURL(), '_blank')}
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Only PDF, no text
  if (hasPdf && !hasText) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/50">
          <div className="flex items-center gap-3">
            <FileText className="h-6 w-6 text-primary" />
            <span className="font-medium">PDF Document</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.open(pdfBlob.getDirectURL(), '_blank')}
          >
            <Download className="h-4 w-4 mr-2" />
            Download PDF
          </Button>
        </div>
        <div className="border rounded-lg overflow-hidden bg-white">
          <iframe
            src={pdfBlob.getDirectURL()}
            className="w-full h-[800px]"
            title="PDF Viewer"
          />
        </div>
        {hasTextAttachment && (
          <div className="p-4 border rounded-lg bg-muted/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm font-medium">Additional Text File</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(textAttachment.getDirectURL(), '_blank')}
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Only text content
  return (
    <div className="space-y-6">
      <div className="prose prose-lg prose-invert max-w-none">
        <MarkdownRenderer content={textContent} />
      </div>
      {hasTextAttachment && (
        <div className="p-4 border rounded-lg bg-muted/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm font-medium">Additional Text File</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open(textAttachment.getDirectURL(), '_blank')}
            >
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
