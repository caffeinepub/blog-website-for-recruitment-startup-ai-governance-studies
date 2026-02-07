/**
 * Centralized substrate name masking utilities.
 * Maps proprietary substrate names to generic Layer labels site-wide.
 */

// Stable mapping of substrate names to generic Layer labels
const SUBSTRATE_TO_LAYER: Record<string, string> = {
  VAR: 'Layer 1',
  ACE: 'Layer 2',
  TRUTH: 'Layer 3',
  FLUIDINTEL: 'Layer 4',
};

// Export layer labels for consistent use across the app
export const LAYER_LABELS = {
  LAYER_1: 'Layer 1',
  LAYER_2: 'Layer 2',
  LAYER_3: 'Layer 3',
  LAYER_4: 'Layer 4',
} as const;

// High-level one-line descriptions for each layer (non-revealing)
export const LAYER_ONE_LINERS = {
  LAYER_1: 'Explores the full possibility space without filtering or judgment.',
  LAYER_2: 'Enforces governance constraints and manages decision timing.',
  LAYER_3: 'Verifies claims against real-time data sources.',
  LAYER_4: 'Executes only authorized actions with no interpretation.',
} as const;

/**
 * Masks substrate names in text by replacing them with generic Layer labels.
 * Handles whole-word matches to avoid partial replacements.
 * @param text - The text to mask
 * @returns The masked text with substrate names replaced by Layer labels
 */
export function maskSubstrateNames(text: string): string {
  if (!text || typeof text !== 'string') return text;

  let masked = text;

  // Replace each substrate name with its corresponding layer label
  // Use word boundaries to avoid partial matches
  Object.entries(SUBSTRATE_TO_LAYER).forEach(([substrate, layer]) => {
    const regex = new RegExp(`\\b${substrate}\\b`, 'gi');
    masked = masked.replace(regex, layer);
  });

  return masked;
}

/**
 * Gets the layer label for a given substrate name.
 * @param substrateName - The substrate name (VAR, ACE, TRUTH, FLUIDINTEL)
 * @returns The corresponding layer label or the original name if not found
 */
export function getLayerLabel(substrateName: string): string {
  return SUBSTRATE_TO_LAYER[substrateName.toUpperCase()] || substrateName;
}

/**
 * Gets the one-line description for a given layer.
 * @param layerKey - The layer key (LAYER_1, LAYER_2, LAYER_3, LAYER_4)
 * @returns The one-line description for the layer
 */
export function getLayerDescription(layerKey: keyof typeof LAYER_ONE_LINERS): string {
  return LAYER_ONE_LINERS[layerKey];
}
