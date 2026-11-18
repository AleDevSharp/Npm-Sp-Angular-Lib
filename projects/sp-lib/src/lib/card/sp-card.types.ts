// --------------------------------------------------------------
// Project: SpLib
// File name: sp-card.types.ts
// File description: Type definitions and interfaces for the SpCard component suite.
// Author: Alessio Giacché
// Date created: 11-11-2026
// License: MIT
// --------------------------------------------------------------

/**
 * SpCardVariant
 * Visual style variants available for the card.
 */
export type SpCardVariant = 'elevated' | 'outlined' | 'glass' | 'flat';

/**
 * SpCardSize
 * Preset sizing options determining padding scale of the card.
 */
export type SpCardSize = 'sm' | 'md' | 'lg';

/**
 * SpCardMediaAspectRatio
 * Supported aspect ratio presets for media covers.
 */
export type SpCardMediaAspectRatio = '16:9' | '4:3' | '1:1' | 'auto';

/**
 * SpCardActionsAlignment
 * Horizontal alignment of action buttons within card actions footer.
 */
export type SpCardActionsAlignment = 'start' | 'center' | 'end' | 'between';
