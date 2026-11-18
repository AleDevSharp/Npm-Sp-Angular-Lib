// --------------------------------------------------------------
// Project: SpLib
// File name: sp-toggle-list.types.ts
// File description: Type definitions and interfaces for the toggle list option cards component.
// Author: Alessio Giacché
// Date created: 11-11-2026
// License: MIT
// --------------------------------------------------------------

/**
 * Selection mode for toggle list.
 */
export type SpToggleListMode = 'single' | 'multiple';

/**
 * Layout orientation for toggle list cards.
 */
export type SpToggleListLayout = 'vertical' | 'grid';

/**
 * Individual option card item configuration.
 */
export interface SpToggleListOption<T = any> {
  // The bold primary title of the option card
  label: string;

  // The unique value of the option card
  value: T;

  // Optional multi-line secondary description
  description?: string;

  // Optional SVG markup or icon identifier
  icon?: string;

  // Optional badge text or counter displayed at the top-right
  badge?: string | number;

  // Whether this specific option card is disabled
  disabled?: boolean;
}
