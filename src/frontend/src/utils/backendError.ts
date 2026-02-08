/**
 * Classify backend errors into user-friendly categories
 */
export type ErrorCategory = 
  | 'canister-stopped'
  | 'canister-unavailable'
  | 'network-error'
  | 'unauthorized'
  | 'not-found'
  | 'unknown';

export interface ClassifiedError {
  category: ErrorCategory;
  userMessage: string;
  technicalDetails: string;
  isRetryable: boolean;
}

/**
 * Extract meaningful error information from various error types
 */
export function classifyBackendError(error: unknown): ClassifiedError {
  const errorString = String(error);
  const errorMessage = error instanceof Error ? error.message : errorString;

  // Check for canister stopped
  if (
    errorMessage.includes('is stopped') ||
    errorMessage.includes('IC0508') ||
    errorMessage.includes('does not have a CallContextManager')
  ) {
    return {
      category: 'canister-stopped',
      userMessage: 'The service is temporarily unavailable. Please try again later or contact support.',
      technicalDetails: errorMessage,
      isRetryable: true,
    };
  }

  // Check for network/connection errors
  if (
    errorMessage.includes('fetch') ||
    errorMessage.includes('network') ||
    errorMessage.includes('timeout') ||
    errorMessage.includes('ECONNREFUSED')
  ) {
    return {
      category: 'network-error',
      userMessage: 'Unable to connect to the service. Please check your internet connection and try again.',
      technicalDetails: errorMessage,
      isRetryable: true,
    };
  }

  // Check for authorization errors
  if (
    errorMessage.includes('Unauthorized') ||
    errorMessage.includes('Access denied') ||
    errorMessage.includes('permission')
  ) {
    return {
      category: 'unauthorized',
      userMessage: 'You do not have permission to access this content.',
      technicalDetails: errorMessage,
      isRetryable: false,
    };
  }

  // Check for not found errors
  if (
    errorMessage.includes('not found') ||
    errorMessage.includes('does not exist')
  ) {
    return {
      category: 'not-found',
      userMessage: 'The requested content could not be found.',
      technicalDetails: errorMessage,
      isRetryable: false,
    };
  }

  // Check for general canister unavailability
  if (
    errorMessage.includes('canister') ||
    errorMessage.includes('replica') ||
    errorMessage.includes('reject')
  ) {
    return {
      category: 'canister-unavailable',
      userMessage: 'The service is currently unavailable. Please try again in a few moments.',
      technicalDetails: errorMessage,
      isRetryable: true,
    };
  }

  // Unknown error
  return {
    category: 'unknown',
    userMessage: 'An unexpected error occurred. Please try again or contact support if the problem persists.',
    technicalDetails: errorMessage,
    isRetryable: true,
  };
}

/**
 * Format error for display (safe for users)
 */
export function formatErrorMessage(error: unknown): string {
  const classified = classifyBackendError(error);
  return classified.userMessage;
}

/**
 * Get technical details (for optional display)
 */
export function getTechnicalDetails(error: unknown): string {
  const classified = classifyBackendError(error);
  return classified.technicalDetails;
}
