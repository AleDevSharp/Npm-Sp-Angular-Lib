// --------------------------------------------------------------
// Project: SpLib
// File name: sp-tooltip.component.ts
// File description: Floating visual tooltip component displaying content, arrow pointer, and optional shortcut.
// Author: Alessio Giacché
// Date created: 11-11-2026
// License: MIT
// --------------------------------------------------------------

// Import
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal, TemplateRef } from '@angular/core';

import { SpTooltipPosition, SpTooltipTheme } from './sp-tooltip.types';

/**
 * SpTooltipComponent
 * @version 1.0.0
 * @since 2.0.0
 * @author Alessio Giacché
 */
@Component({
  selector: 'sp-tooltip',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sp-tooltip.component.html',
  styleUrl: './sp-tooltip.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpTooltipComponent {
  // The string text content of the tooltip
  public readonly text = signal<string>('');

  // The optional template reference for rich HTML content
  public readonly template = signal<TemplateRef<unknown> | null>(null);

  // The visual position of the tooltip relative to host
  public readonly position = signal<SpTooltipPosition>('top');

  // The color theme for the tooltip
  public readonly theme = signal<SpTooltipTheme>('dark');

  // Whether to render the directional arrow indicator
  public readonly showArrow = signal<boolean>(true);

  // The optional keyboard shortcut badge (e.g. 'Ctrl+K')
  public readonly shortcut = signal<string>('');

  // The visibility state signal triggering entrance/exit animations
  public readonly visible = signal<boolean>(false);

  // The computed X coordinate in pixels for fixed positioning
  public readonly top = signal<number>(0);

  // The computed Y coordinate in pixels for fixed positioning
  public readonly left = signal<number>(0);

  /**
   * Constructor for SpTooltipComponent component
   */
  constructor() {}
}
