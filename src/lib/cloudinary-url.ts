/**
 * Builds a Cloudinary image URL using environment variables
 * @param publicId - The public ID of the image in Cloudinary
 * @param options - Optional parameters like width, height, quality
 * @returns The full Cloudinary image URL
 */
export function buildCloudinaryUrl(
  publicId: string,
  version?: string,
  quality: string = "auto",
  format: string = "auto",
): string {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  if (!cloudName) {
    throw new Error(
      "NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME environment variable is not set",
    );
  }

  // Build the base URL
  let url = `https://res.cloudinary.com/${cloudName}/image/upload`;

  // Add quality and format parameters
  url += `/q_${quality},f_${format}`;

  // Add version if provided
  if (version) {
    url += `/${version}`;
  }

  // Add public ID
  url += `/${publicId}`;

  return url;
}

/**
 * Builds a Cloudinary image URL with the full path (version and public ID combined)
 * Used when you have the complete upload path
 * @param fullPath - The path including version and public ID (e.g., "v1774593697/CWG1-PCC-HomePage_saffrq.png")
 * @returns The full Cloudinary image URL
 */
export function buildCloudinaryUrlFromPath(fullPath: string): string {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  if (!cloudName) {
    throw new Error(
      "NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME environment variable is not set",
    );
  }

  return `https://res.cloudinary.com/${cloudName}/image/upload/${fullPath}`;
}
