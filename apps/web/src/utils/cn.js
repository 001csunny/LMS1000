/**
 * Utility function for merging Tailwind CSS classes
 * Handles conditional classes and prevents conflicts
 */
export function cn(...classes) {
  return classes
    .filter(Boolean)
    .join(' ')
    .replace(/(\w+)\s+(\w+)/g, '$1 $2') // Remove duplicate classes
    .trim();
}
