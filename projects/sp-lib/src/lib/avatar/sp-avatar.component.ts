// --------------------------------------------------------------
// Project: SpLib
// File name: sp-avatar.component.ts
// File description: User avatar component supporting image fallback to hashed color initials and presence dots.
// Author: Alessio Giacché
// Date created: 11-11-2026
// License: MIT
// --------------------------------------------------------------

// Import
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
  signal
} from '@angular/core';

import { SpAvatarShape, SpAvatarSize, SpAvatarStatus } from './sp-avatar.types';

/**
 * Predefined harmonic gradient pairs for initials avatar background.
 */
const GRADIENT_PALETTES: [string, string][] = [
  ['#6366f1', '#8b5cf6'], // Indigo to Violet
  ['#ec4899', '#f43f5e'], // Pink to Rose
  ['#06b6d4', '#3b82f6'], // Cyan to Blue
  ['#10b981', '#14b8a6'], // Emerald to Teal
  ['#f59e0b', '#d97706'], // Amber to Orange
  ['#8b5cf6', '#d946ef'], // Purple to Fuchsia
  ['#3b82f6', '#1d4ed8'], // Blue to Dark Blue
  ['#14b8a6', '#0ea5e9']  // Teal to Sky
];

/**
 * SpAvatarComponent
 * High-performance avatar with automatic image error fallback, initials extraction, and presence status dot.
 * @version 1.0.0
 * @since 2.0.0
 * @author Alessio Giacché
 */
@Component({
  selector: 'sp-avatar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sp-avatar.component.html',
  styleUrl: './sp-avatar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpAvatarComponent {
  // Image resource URL
  public src = input<string | undefined>(undefined);

  // Full user name for initials extraction and fallback
  public name = input<string>('');

  // Accessible alternative text for the image
  public alt = input<string>('');

  // Size scale preset
  public size = input<SpAvatarSize>('md');

  // Shape of the avatar: circle or squircle rounded
  public shape = input<SpAvatarShape>('circle');

  // Online presence status indicator
  public status = input<SpAvatarStatus | undefined>(undefined);

  // Internal state tracking whether image failed to load
  public hasImageError = signal<boolean>(false);

  // Computed initials extracted from user name
  public initials = computed<string>(() => {
    const rawName = this.name().trim();
    if (!rawName) {
      return '';
    }

    const parts = rawName.split(/\s+/).filter(Boolean);
    if (parts.length === 1) {
      return parts[0].charAt(0).toUpperCase();
    }

    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  });

  // Computed gradient background based on string hash of the name
  public avatarGradient = computed<string>(() => {
    const text = this.name().trim();
    if (!text) {
      return 'linear-gradient(135deg, #64748b 0%, #475569 100%)';
    }

    let hash = 0;
    for (let i = 0; i < text.length; i++) {
      hash = text.charCodeAt(i) + ((hash << 5) - hash);
    }

    const index = Math.abs(hash) % GRADIENT_PALETTES.length;
    const [c1, c2] = GRADIENT_PALETTES[index];
    return `linear-gradient(135deg, ${c1} 0%, ${c2} 100%)`;
  });

  // Computed flag determining whether the img element should be rendered
  public shouldShowImage = computed<boolean>(() => {
    return Boolean(this.src()) && !this.hasImageError();
  });

  /**
   * Constructor for SpAvatarComponent component
   */
  constructor() {
    // Reset image error state if src input changes
    effect(() => {
      this.src();
      this.hasImageError.set(false);
    });
  }

  /**
   * Handles error event when avatar image fails to load.
   * @returns void
   */
  public onImageError(): void {
    this.hasImageError.set(true);
  }
}
