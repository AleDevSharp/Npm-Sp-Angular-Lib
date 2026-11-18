// --------------------------------------------------------------
// Project: SpLib
// File name: sp-badge.types.ts
// File description: Type definitions and interfaces for the badge component.
// Author: Alessio Giacché
// Date created: 11-11-2026
// License: MIT
// --------------------------------------------------------------

/**
 * Styling variant for badge.
 */
export type SpBadgeVariant = 'solid' | 'soft' | 'outline' | 'dot';

/**
 * Semantic color palette options for badge.
 */
export type SpBadgeColor = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';

/**
 * Size preset for badge.
 */
export type SpBadgeSize = 'sm' | 'md' | 'lg';

/**
 * Overlay placement position when wrapping a host element.
 */
export type SpBadgePlacement = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'inline';
