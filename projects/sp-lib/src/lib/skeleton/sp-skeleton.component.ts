// --------------------------------------------------------------
// Project: SpLib
// File name: sp-skeleton.component.ts
// File description: High-performance shimmer skeleton loader placeholder supporting text paragraphs, circles, and rects.
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
  input
} from '@angular/core';

import { SpSkeletonVariant } from './sp-skeleton.types';

/**
 * SpSkeletonComponent
 * Animated content loading placeholder with fluid diagonal shimmer beam.
 * @version 1.0.0
 * @since 2.0.0
 * @author Alessio Giacché
 */
@Component({
  selector: 'sp-skeleton',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sp-skeleton.component.html',
  styleUrl: './sp-skeleton.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpSkeletonComponent {
  // The visual geometric variant: text line, circle avatar, or rectangular card
  public variant = input<SpSkeletonVariant>('text');

  // Explicit width dimension (number in px or CSS string)
  public width = input<string | number | undefined>(undefined);

  // Explicit height dimension (number in px or CSS string)
  public height = input<string | number | undefined>(undefined);

  // Custom border-radius CSS value
  public borderRadius = input<string | undefined>(undefined);

  // Number of text placeholder lines to generate when variant is 'text'
  public lines = input<number>(1);

  // Whether the diagonal shimmer light beam animation is active
  public animated = input<boolean>(true);

  // Computed array of line indices for multi-line text generation
  public lineIndices = computed<number[]>(() => {
    const count = Math.max(1, this.lines());
    return Array.from({ length: count }, (_, i) => i);
  });

  // Computed CSS width string
  public formattedWidth = computed<string | null>(() => {
    return this.formatDimension(this.width());
  });

  // Computed CSS height string
  public formattedHeight = computed<string | null>(() => {
    return this.formatDimension(this.height());
  });

  /**
   * Constructor for SpSkeletonComponent component
   */
  constructor() {}

  /**
   * Calculates the width for a specific text line index.
   * If there are multiple lines, the final line defaults to 65% width for realistic paragraphs.
   * @param index The line index
   * @returns string | null The CSS width string
   */
  public getLineWidth(index: number): string | null {
    const totalLines = this.lines();
    const explicitWidth = this.formattedWidth();

    if (totalLines > 1 && index === totalLines - 1 && !explicitWidth) {
      return '65%';
    }

    return explicitWidth;
  }

  /**
   * Formats a raw dimension number or string into a valid CSS value.
   * @param value The raw dimension
   * @returns string | null The formatted CSS dimension
   */
  private formatDimension(value: string | number | undefined): string | null {
    if (value === undefined || value === null) {
      return null;
    }
    if (typeof value === 'number') {
      return `${value}px`;
    }
    return String(value);
  }
}
