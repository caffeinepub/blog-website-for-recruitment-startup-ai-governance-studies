import { articleTemplates, type ArticleTemplate } from '../content/articleTemplates';
import type { Article } from '../backend';

/**
 * Convert an ArticleTemplate to a normalized Article shape
 */
export function templateToArticle(template: ArticleTemplate, index: number = 0): Article {
  return {
    id: BigInt(index + 1000), // Use high IDs to avoid collision with real articles
    slug: template.slug,
    title: template.title,
    textContent: template.content,
    author: template.author,
    tags: template.tags,
    published: true,
    timestamp: BigInt(Date.now() * 1_000_000),
    pdf: undefined,
    textAttachment: undefined,
  };
}

/**
 * Get all template articles as normalized Article objects
 */
export function getAllTemplateArticles(): Article[] {
  return articleTemplates.map((template, index) => templateToArticle(template, index));
}

/**
 * Find a template article by slug
 */
export function getTemplateArticleBySlug(slug: string): Article | null {
  const template = articleTemplates.find(t => t.slug === slug);
  if (!template) return null;
  
  const index = articleTemplates.indexOf(template);
  return templateToArticle(template, index);
}
