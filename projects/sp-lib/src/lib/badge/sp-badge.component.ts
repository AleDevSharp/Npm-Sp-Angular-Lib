// --------------------------------------------------------------
// Project: SpLib
// File name: sp-badge.component.ts
// File description: Versatile status badge and notification counter component supporting radar ping animation and overflow caps.
// Author: Alessio Giacché
// Date created: 11-11-2026
// License: MIT
// --------------------------------------------------------------

// Import
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

import { SpBadgeColor, SpBadgePlacement, SpBadgeSize, SpBadgeVariant } from './sp-badge.types';

/**
 * SpBadgeComponent
 * Status dot with radar ping effect and notification counter badge.
 * @version 1.0.0
 * @since 2.0.0
 * @author Alessio Giacché
 */
@Component({
  selector: 'sp-badge',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sp-badge.component.html',
  styleUrl: './sp-badge.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpBadgeComponent {
  // The badge content to display (number or string)
  public content = input<string | number | null | undefined>(null);

  // The semantic color scheme
  public color = input<SpBadgeColor>('primary');

  // The visual styling variant
  public variant = input<SpBadgeVariant>('solid');

  // The size scale preset
  public size = input<SpBadgeSize>('md');

  // The overlay placement position when wrapping content
  public placement = input<SpBadgePlacement>('inline');

  // Whether to render as a compact status dot without text
  public dot = input<boolean>(false);

  // Whether to activate the pulsing radar/ping wave animation
  public pulse = input<boolean>(false);

  // The maximum counter value before truncating with a plus symbol
  public max = input<number>(99);

  // Whether the badge is visually hidden
  public hidden = input<boolean>(false);

  // Computed display string formatting number overflows
  public displayContent = computed<string>(() => {
    const raw = this.content();

    if (raw === null || raw === undefined) {
      return '';
    }

    if (typeof raw === 'number') {
      const cap = this.max();
      if (raw > cap) {
        return `${cap}+`;
      }
      return raw.toString();
    }

    return String(raw);
  });

  // Computed flag determining if dot mode is active
  public isDotMode = computed<boolean>(() => {
    return this.dot() || this.variant() === 'dot';
  });

  /**
   * Constructor for SpBadgeComponent component
   */
  constructor() {}
}
