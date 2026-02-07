import { maskSubstrateNames } from '@/utils/layerMask';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export default function MarkdownRenderer({ content, className = '' }: MarkdownRendererProps) {
  // Coerce to string and handle empty/null/undefined
  const safeContent = content != null ? String(content) : '';
  
  // Check for empty content after coercion
  if (!safeContent.trim()) {
    return <div className={className}>No content available.</div>;
  }

  // Apply substrate name masking at render time
  const maskedContent = maskSubstrateNames(safeContent);

  // Simple markdown-to-HTML conversion without external dependencies
  const renderMarkdown = (text: string): string => {
    let html = text;

    // Escape HTML to prevent XSS
    html = html
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    // Headers (must come before other replacements)
    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

    // Bold
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/__(.+?)__/g, '<strong>$1</strong>');

    // Italic
    html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
    html = html.replace(/_(.+?)_/g, '<em>$1</em>');

    // Links - mask alt text in the replacement
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, text, url) => {
      const maskedText = maskSubstrateNames(text);
      const isExternal = url.startsWith('http');
      const target = isExternal ? ' target="_blank" rel="noopener noreferrer"' : '';
      return `<a href="${url}"${target}>${maskedText}</a>`;
    });

    // Images - mask alt text
    html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (match, alt, url) => {
      const maskedAlt = maskSubstrateNames(alt);
      return `<img src="${url}" alt="${maskedAlt}" />`;
    });

    // Code blocks
    html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>');
    
    // Inline code
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

    // Lists - unordered
    html = html.replace(/^\* (.+)$/gim, '<li>$1</li>');
    html = html.replace(/^- (.+)$/gim, '<li>$1</li>');
    html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');

    // Lists - ordered
    html = html.replace(/^\d+\. (.+)$/gim, '<li>$1</li>');

    // Blockquotes
    html = html.replace(/^> (.+)$/gim, '<blockquote>$1</blockquote>');

    // Horizontal rules
    html = html.replace(/^---$/gim, '<hr />');
    html = html.replace(/^\*\*\*$/gim, '<hr />');

    // Line breaks - convert double newlines to paragraphs
    const paragraphs = html.split(/\n\n+/);
    html = paragraphs
      .map(p => {
        // Don't wrap if already wrapped in a block element
        if (p.match(/^<(h[1-6]|ul|ol|blockquote|pre|hr)/)) {
          return p;
        }
        return `<p>${p.replace(/\n/g, '<br />')}</p>`;
      })
      .join('\n');

    return html;
  };

  const htmlContent = renderMarkdown(maskedContent);

  return (
    <div 
      className={`prose prose-invert max-w-none ${className}`}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
}
