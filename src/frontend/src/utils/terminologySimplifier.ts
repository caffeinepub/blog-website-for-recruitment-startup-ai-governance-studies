/**
 * Centralized terminology simplification utility.
 * Automatically detects and replaces complex terminology with simpler synonyms
 * while preserving meaning and protecting code blocks, URLs, and other non-human text.
 */

// Single source of truth: mapping of complex terms to simpler alternatives
// Each entry preserves the original meaning while using more accessible language
const TERMINOLOGY_MAP: Record<string, string> = {
  // Technical/Academic terms
  'geometry': 'structure',
  'geometries': 'structures',
  'geometric': 'structural',
  'entropy': 'randomness',
  'algorithm': 'process',
  'algorithms': 'processes',
  'algorithmic': 'process-based',
  'heuristic': 'rule of thumb',
  'heuristics': 'rules of thumb',
  'paradigm': 'approach',
  'paradigms': 'approaches',
  'methodology': 'method',
  'methodologies': 'methods',
  'optimize': 'improve',
  'optimization': 'improvement',
  'optimized': 'improved',
  'optimizing': 'improving',
  'utilize': 'use',
  'utilization': 'use',
  'utilized': 'used',
  'utilizing': 'using',
  'leverage': 'use',
  'leveraging': 'using',
  'leveraged': 'used',
  'facilitate': 'help',
  'facilitates': 'helps',
  'facilitated': 'helped',
  'facilitating': 'helping',
  'implement': 'build',
  'implementation': 'building',
  'implemented': 'built',
  'implementing': 'building',
  'synthesize': 'combine',
  'synthesis': 'combination',
  'synthesized': 'combined',
  'synthesizing': 'combining',
  'aggregate': 'combine',
  'aggregation': 'combination',
  'aggregated': 'combined',
  'aggregating': 'combining',
  'iterate': 'repeat',
  'iteration': 'repetition',
  'iterated': 'repeated',
  'iterating': 'repeating',
  'iterative': 'repeated',
  'constraint': 'limit',
  'constraints': 'limits',
  'constrained': 'limited',
  'parameter': 'setting',
  'parameters': 'settings',
  'metric': 'measure',
  'metrics': 'measures',
  'quantify': 'measure',
  'quantified': 'measured',
  'quantifying': 'measuring',
  'quantitative': 'measurable',
  'qualitative': 'descriptive',
  'empirical': 'observed',
  'theoretical': 'conceptual',
  'hypothesis': 'theory',
  'hypotheses': 'theories',
  'hypothetical': 'theoretical',
  'anomaly': 'unusual pattern',
  'anomalies': 'unusual patterns',
  'anomalous': 'unusual',
  'trajectory': 'path',
  'trajectories': 'paths',
  'cognitive': 'thinking',
  'cognition': 'thinking',
  'architecture': 'structure',
  'architectures': 'structures',
  'infrastructure': 'foundation',
  'framework': 'structure',
  'frameworks': 'structures',
  'ecosystem': 'environment',
  'ecosystems': 'environments',
  'holistic': 'complete',
  'comprehensive': 'complete',
  'granular': 'detailed',
  'granularity': 'detail level',
  'scalable': 'expandable',
  'scalability': 'expandability',
  'robust': 'strong',
  'robustness': 'strength',
  'resilient': 'adaptable',
  'resilience': 'adaptability',
  'dynamic': 'changing',
  'static': 'fixed',
  'volatile': 'unstable',
  'volatility': 'instability',
  'deterministic': 'predictable',
  'stochastic': 'random',
  'probabilistic': 'chance-based',
  'correlation': 'connection',
  'correlations': 'connections',
  'correlated': 'connected',
  'causation': 'cause',
  'causality': 'cause and effect',
  'causal': 'causing',
};

// Protected patterns that should never be modified
const PROTECTED_PATTERNS = [
  // URLs and email addresses
  /https?:\/\/[^\s<>"{}|\\^`\[\]]+/gi,
  /mailto:[^\s<>"{}|\\^`\[\]]+/gi,
  /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/gi,
  // Code blocks (fenced)
  /```[\s\S]*?```/g,
  // Inline code
  /`[^`]+`/g,
  // HTML tags and entities
  /<[^>]+>/g,
  /&[a-zA-Z]+;/g,
  /&#[0-9]+;/g,
  // Markdown image syntax (protect URLs only)
  /!\[[^\]]*\]\([^)]+\)/g,
  // Markdown link URLs (protect URLs only)
  /\]\([^)]+\)/g,
];

interface ProtectedSegment {
  placeholder: string;
  original: string;
  start: number;
  end: number;
}

/**
 * Extracts and replaces protected segments with placeholders
 */
function protectSegments(text: string): { text: string; segments: ProtectedSegment[] } {
  const segments: ProtectedSegment[] = [];
  let protectedText = text;
  let placeholderIndex = 0;

  PROTECTED_PATTERNS.forEach((pattern) => {
    const matches = Array.from(protectedText.matchAll(pattern));
    matches.forEach((match) => {
      if (match[0] && match.index !== undefined) {
        const placeholder = `__PROTECTED_${placeholderIndex}__`;
        segments.push({
          placeholder,
          original: match[0],
          start: match.index,
          end: match.index + match[0].length,
        });
        protectedText = protectedText.replace(match[0], placeholder);
        placeholderIndex++;
      }
    });
  });

  return { text: protectedText, segments };
}

/**
 * Restores protected segments from placeholders
 */
function restoreSegments(text: string, segments: ProtectedSegment[]): string {
  let restoredText = text;
  segments.forEach((segment) => {
    restoredText = restoredText.replace(segment.placeholder, segment.original);
  });
  return restoredText;
}

/**
 * Simplifies terminology in the given text by replacing complex terms with simpler synonyms.
 * Preserves meaning and protects code blocks, URLs, emails, and other non-human text.
 * 
 * @param text - The text to simplify
 * @returns The simplified text with complex terminology replaced
 */
export function simplifyTerminology(text: string): string {
  if (!text || typeof text !== 'string') return text;

  // Step 1: Protect segments that should not be modified
  const { text: protectedText, segments } = protectSegments(text);

  // Step 2: Apply terminology replacements with word boundaries
  let simplified = protectedText;
  
  Object.entries(TERMINOLOGY_MAP).forEach(([complex, simple]) => {
    // Use word boundaries to avoid partial matches
    // Case-insensitive matching with case preservation
    const regex = new RegExp(`\\b${complex}\\b`, 'gi');
    simplified = simplified.replace(regex, (match) => {
      // Preserve original case pattern
      if (match[0] === match[0].toUpperCase()) {
        // First letter was uppercase
        return simple.charAt(0).toUpperCase() + simple.slice(1);
      }
      return simple;
    });
  });

  // Step 3: Restore protected segments
  const restored = restoreSegments(simplified, segments);

  return restored;
}

/**
 * Gets the simpler alternative for a specific complex term.
 * Useful for UI labels or tooltips.
 * 
 * @param term - The complex term to look up
 * @returns The simpler alternative or the original term if not found
 */
export function getSimplifiedTerm(term: string): string {
  return TERMINOLOGY_MAP[term.toLowerCase()] || term;
}

/**
 * Checks if a term is in the simplification dictionary.
 * 
 * @param term - The term to check
 * @returns True if the term has a simpler alternative
 */
export function hasSimplification(term: string): boolean {
  return term.toLowerCase() in TERMINOLOGY_MAP;
}
