/**
 * Composition helper for applying multiple text transformations in a predictable order.
 * Combines substrate masking and terminology simplification for consistent site-wide behavior.
 */

import { maskSubstrateNames } from './layerMask';
import { simplifyTerminology } from './terminologySimplifier';

/**
 * Applies all user-facing text transformations in the correct order:
 * 1. Substrate name masking (proprietary names → Layer labels)
 * 2. Terminology simplification (complex words → simpler synonyms)
 * 
 * This ensures consistent behavior across the entire site.
 * 
 * @param text - The text to transform
 * @returns The transformed text with both masking and simplification applied
 */
export function simplifyUserFacingText(text: string): string {
  if (!text || typeof text !== 'string') return text;
  
  // Order matters: mask first, then simplify
  // This prevents simplification from affecting substrate names
  const masked = maskSubstrateNames(text);
  const simplified = simplifyTerminology(masked);
  
  return simplified;
}

/**
 * Applies transformations to an array of strings.
 * Useful for processing lists of tags, labels, etc.
 * 
 * @param texts - Array of texts to transform
 * @returns Array of transformed texts
 */
export function simplifyUserFacingTexts(texts: string[]): string[] {
  return texts.map(simplifyUserFacingText);
}
