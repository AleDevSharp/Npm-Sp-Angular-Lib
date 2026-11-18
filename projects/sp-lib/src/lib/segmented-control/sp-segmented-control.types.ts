// --------------------------------------------------------------
// Project: SpLib
// File name: sp-segmented-control.types.ts
// File description: Type definitions and interfaces for the segmented control component.
// Author: Alessio Giacché
// Date created: 11-11-2026
// License: MIT
// --------------------------------------------------------------

/**
 * Size preset for segmented control.
 */
export type SpSegmentedControlSize = 'sm' | 'md' | 'lg';

/**
 * Individual option configuration in segmented control.
 */
export interface SpSegmentedControlOption<T = any> {
  // The display label text
  label: string;

  // The unique value of the option
  value: T;

  // Optional icon markup or identifier
  icon?: string;

  // Whether this specific option is disabled
  disabled?: boolean;

  // Optional badge text or counter displayed alongside the label
  badge?: string | number;
}
