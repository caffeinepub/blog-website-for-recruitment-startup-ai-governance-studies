import { simplifyUserFacingText } from '@/utils/textTransforms';

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

  // Simple markdown-to-HTML conversion with integrated text transformations
  const renderMarkdown = (text: string): string => {
    let html = text;

    // Escape HTML to prevent XSS
    html = html
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    // Headers (must come before other replacements)
    html = html.replace(/^### (.*$)/gim, (match, content) => {
      return `<h3>${simplifyUserFacingText(content)}</h3>`;
    });
    html = html.replace(/^## (.*$)/gim, (match, content) => {
      return `<h2>${simplifyUserFacingText(content)}</h2>`;
    });
    html = html.replace(/^# (.*$)/gim, (match, content) => {
      return `<h1>${simplifyUserFacingText(content)}</h1>`;
    });

    // Bold
    html = html.replace(/\*\*(.+?)\*\*/g, (match, content) => {
      return `<strong>${simplifyUserFacingText(content)}</strong>`;
    });
    html = html.replace(/__(.+?)__/g, (match, content) => {
      return `<strong>${simplifyUserFacingText(content)}</strong>`;
    });

    // Italic
    html = html.replace(/\*(.+?)\*/g, (match, content) => {
      return `<em>${simplifyUserFacingText(content)}</em>`;
    });
    html = html.replace(/_(.+?)_/g, (match, content) => {
      return `<em>${simplifyUserFacingText(content)}</em>`;
    });

    // Links - simplify link text but preserve URLs
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, text, url) => {
      const simplifiedText = simplifyUserFacingText(text);
      const isExternal = url.startsWith('http');
      const target = isExternal ? ' target="_blank" rel="noopener noreferrer"' : '';
      return `<a href="${url}"${target}>${simplifiedText}</a>`;
    });

    // Images - simplify alt text but preserve URLs
    html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (match, alt, url) => {
      const simplifiedAlt = simplifyUserFacingText(alt);
      return `<img src="${url}" alt="${simplifiedAlt}" />`;
    });

    // Code blocks - preserve as-is (no simplification)
    html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>');
    
    // Inline code - preserve as-is (no simplification)
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

    // Lists - unordered (simplify list items)
    html = html.replace(/^\* (.+)$/gim, (match, content) => {
      return `<li>${simplifyUserFacingText(content)}</li>`;
    });
    html = html.replace(/^- (.+)$/gim, (match, content) => {
      return `<li>${simplifyUserFacingText(content)}</li>`;
    });
    html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');

    // Lists - ordered (simplify list items)
    html = html.replace(/^\d+\. (.+)$/gim, (match, content) => {
      return `<li>${simplifyUserFacingText(content)}</li>`;
    });

    // Blockquotes (simplify content)
    html = html.replace(/^> (.+)$/gim, (match, content) => {
      return `<blockquote>${simplifyUserFacingText(content)}</blockquote>`;
    });

    // Horizontal rules
    html = html.replace(/^---$/gim, '<hr />');
    html = html.replace(/^\*\*\*$/gim, '<hr />');

    // Line breaks - convert double newlines to paragraphs (simplify paragraph content)
    const paragraphs = html.split(/\n\n+/);
    html = paragraphs
      .map(p => {
        // Don't wrap if already wrapped in a block element
        if (p.match(/^<(h[1-6]|ul|ol|blockquote|pre|hr|code)/)) {
          return p;
        }
        const simplified = simplifyUserFacingText(p.replace(/\n/g, '<br />'));
        return `<p>${simplified}</p>`;
      })
      .join('\n');

    return html;
  };

  const htmlContent = renderMarkdown(safeContent);

  return (
    <div 
      className={`prose prose-invert max-w-none ${className}`}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
}
