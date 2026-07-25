import { type ClassValue, clsx } from 'clsx';

/**
 * Merges Tailwind class names with conditional logic support.
 * Accepts any number of class values, arrays, or objects.
 */
export function cn(...inputs: ClassValue[]): string {
  return clsx(...inputs);
}

/**
 * Clamps a number between min and max.
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Maps a value from one numeric range to another.
 * Used for parallax depth calculations.
 */
export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  return ((value - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin;
}
