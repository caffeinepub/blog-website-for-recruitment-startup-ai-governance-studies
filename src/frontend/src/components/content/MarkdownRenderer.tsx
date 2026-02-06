import React from 'react';

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const parseMarkdown = (text: string) => {
    const elements: React.ReactElement[] = [];
    let currentParagraph: string[] = [];
    let inCodeBlock = false;
    let codeBlockContent: string[] = [];
    let listItems: string[] = [];
    let listType: 'ul' | 'ol' | null = null;
    let key = 0;

    const flushParagraph = () => {
      if (currentParagraph.length > 0) {
        const content = currentParagraph.join(' ');
        elements.push(
          <p key={key++} className="mb-4 leading-7">
            {parseInline(content)}
          </p>
        );
        currentParagraph = [];
      }
    };

    const flushList = () => {
      if (listItems.length > 0 && listType) {
        const ListTag = listType;
        elements.push(
          <ListTag
            key={key++}
            className={`${listType === 'ul' ? 'list-disc' : 'list-decimal'} list-inside mb-4 space-y-2`}
          >
            {listItems.map((item, idx) => (
              <li key={idx} className="leading-7">
                {parseInline(item)}
              </li>
            ))}
          </ListTag>
        );
        listItems = [];
        listType = null;
      }
    };

    const flushCodeBlock = () => {
      if (codeBlockContent.length > 0) {
        elements.push(
          <pre key={key++} className="bg-muted rounded-lg p-4 overflow-x-auto my-4">
            <code className="text-sm font-mono">{codeBlockContent.join('\n')}</code>
          </pre>
        );
        codeBlockContent = [];
      }
    };

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const trimmed = line.trim();

      // Code blocks
      if (trimmed.startsWith('```')) {
        flushParagraph();
        flushList();
        if (inCodeBlock) {
          flushCodeBlock();
          inCodeBlock = false;
        } else {
          inCodeBlock = true;
        }
        continue;
      }

      if (inCodeBlock) {
        codeBlockContent.push(line);
        continue;
      }

      // Empty line
      if (!trimmed) {
        flushParagraph();
        flushList();
        continue;
      }

      // Headers
      if (trimmed.startsWith('# ')) {
        flushParagraph();
        flushList();
        elements.push(
          <h1 key={key++} className="text-4xl font-bold mt-8 mb-4">
            {parseInline(trimmed.slice(2))}
          </h1>
        );
        continue;
      }
      if (trimmed.startsWith('## ')) {
        flushParagraph();
        flushList();
        elements.push(
          <h2 key={key++} className="text-3xl font-bold mt-6 mb-3">
            {parseInline(trimmed.slice(3))}
          </h2>
        );
        continue;
      }
      if (trimmed.startsWith('### ')) {
        flushParagraph();
        flushList();
        elements.push(
          <h3 key={key++} className="text-2xl font-bold mt-5 mb-2">
            {parseInline(trimmed.slice(4))}
          </h3>
        );
        continue;
      }
      if (trimmed.startsWith('#### ')) {
        flushParagraph();
        flushList();
        elements.push(
          <h4 key={key++} className="text-xl font-bold mt-4 mb-2">
            {parseInline(trimmed.slice(5))}
          </h4>
        );
        continue;
      }

      // Blockquote
      if (trimmed.startsWith('> ')) {
        flushParagraph();
        flushList();
        elements.push(
          <blockquote key={key++} className="border-l-4 border-primary pl-4 italic my-4">
            {parseInline(trimmed.slice(2))}
          </blockquote>
        );
        continue;
      }

      // Unordered list
      if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        flushParagraph();
        if (listType !== 'ul') {
          flushList();
          listType = 'ul';
        }
        listItems.push(trimmed.slice(2));
        continue;
      }

      // Ordered list
      const orderedMatch = trimmed.match(/^\d+\.\s+(.+)$/);
      if (orderedMatch) {
        flushParagraph();
        if (listType !== 'ol') {
          flushList();
          listType = 'ol';
        }
        listItems.push(orderedMatch[1]);
        continue;
      }

      // Regular paragraph
      flushList();
      currentParagraph.push(trimmed);
    }

    // Flush remaining content
    flushParagraph();
    flushList();
    flushCodeBlock();

    return elements;
  };

  const parseInline = (text: string): (string | React.ReactElement)[] => {
    const parts: (string | React.ReactElement)[] = [];
    let remaining = text;
    let key = 0;

    while (remaining) {
      // Bold **text**
      const boldMatch = remaining.match(/^(.*?)\*\*(.+?)\*\*(.*)/);
      if (boldMatch) {
        if (boldMatch[1]) parts.push(boldMatch[1]);
        parts.push(
          <strong key={key++} className="font-bold">
            {boldMatch[2]}
          </strong>
        );
        remaining = boldMatch[3];
        continue;
      }

      // Italic *text*
      const italicMatch = remaining.match(/^(.*?)\*(.+?)\*(.*)/);
      if (italicMatch) {
        if (italicMatch[1]) parts.push(italicMatch[1]);
        parts.push(
          <em key={key++} className="italic">
            {italicMatch[2]}
          </em>
        );
        remaining = italicMatch[3];
        continue;
      }

      // Inline code `code`
      const codeMatch = remaining.match(/^(.*?)`(.+?)`(.*)/);
      if (codeMatch) {
        if (codeMatch[1]) parts.push(codeMatch[1]);
        parts.push(
          <code key={key++} className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">
            {codeMatch[2]}
          </code>
        );
        remaining = codeMatch[3];
        continue;
      }

      // Links [text](url)
      const linkMatch = remaining.match(/^(.*?)\[(.+?)\]\((.+?)\)(.*)/);
      if (linkMatch) {
        if (linkMatch[1]) parts.push(linkMatch[1]);
        parts.push(
          <a
            key={key++}
            href={linkMatch[3]}
            className="text-primary hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {linkMatch[2]}
          </a>
        );
        remaining = linkMatch[4];
        continue;
      }

      // No more special formatting
      parts.push(remaining);
      break;
    }

    return parts;
  };

  const lines = content.split('\n');
  return <div className="markdown-content">{parseMarkdown(content)}</div>;
}
