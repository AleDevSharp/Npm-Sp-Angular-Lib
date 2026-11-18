// --------------------------------------------------------------
// Project: SpLib
// File name: sp-avatar.types.ts
// File description: Type definitions and interfaces for the avatar and avatar group components.
// Author: Alessio Giacché
// Date created: 11-11-2026
// License: MIT
// --------------------------------------------------------------

/**
 * Size scale preset for avatar.
 */
export type SpAvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Geometric shape for avatar.
 */
export type SpAvatarShape = 'circle' | 'rounded';

/**
 * User presence status indicator.
 */
export type SpAvatarStatus = 'online' | 'offline' | 'busy' | 'away';

/**
 * Configuration item for individual avatar in an avatar group.
 */
export interface SpAvatarItem {
  // Image source URL
  src?: string;

  // Full name of the user for initials fallback and tooltip
  name: string;

  // Optional presence status
  status?: SpAvatarStatus;

  // Optional alternative text
  alt?: string;
}
