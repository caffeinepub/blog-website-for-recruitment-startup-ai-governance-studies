import { ExternalBlob } from '../backend';

/**
 * Converts a browser File to an ExternalBlob for upload
 * @param file - The File object to convert
 * @param onProgress - Optional callback for upload progress (0-100)
 * @returns ExternalBlob ready for upload
 */
export async function fileToExternalBlob(
  file: File,
  onProgress?: (percentage: number) => void
): Promise<ExternalBlob> {
  const arrayBuffer = await file.arrayBuffer();
  const bytes = new Uint8Array(arrayBuffer);
  
  let blob = ExternalBlob.fromBytes(bytes);
  
  if (onProgress) {
    blob = blob.withUploadProgress(onProgress);
  }
  
  return blob;
}

/**
 * Validates file type for PDF uploads
 */
export function isPdfFile(file: File): boolean {
  return file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
}

/**
 * Validates file type for text uploads
 */
export function isTextFile(file: File): boolean {
  return (
    file.type === 'text/plain' ||
    file.type === 'text/markdown' ||
    file.name.toLowerCase().endsWith('.txt') ||
    file.name.toLowerCase().endsWith('.md')
  );
}
