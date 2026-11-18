// --------------------------------------------------------------
// Project: SpLib
// File name: sp-ripple.types.ts
// File description: Types, interfaces, and configurations for SpRippleDirective.
// Author: Alessio Giacché
// Date created: 11-11-2026
// License: MIT
// --------------------------------------------------------------

/**
 * SpRippleConfig
 * Configuration options for the ripple animation.
 */
export interface SpRippleConfig {
  /**
   * Custom color of the ripple wave (hex, rgb, rgba).
   */
  color?: string;

  /**
   * Whether the ripple should originate from the exact center of the host element.
   */
  centered?: boolean;

  /**
   * Duration of the ripple animation in milliseconds.
   */
  duration?: number;

  /**
   * Whether the ripple is unbounded and extends outside host boundaries.
   */
  unbounded?: boolean;

  /**
   * Whether the ripple is disabled.
   */
  disabled?: boolean;
}

/**
 * Default duration for the ripple animation in milliseconds.
 */
export const SP_RIPPLE_DEFAULT_DURATION = 600;
