// --------------------------------------------------------------
// Project: SpLib
// File name: sp-card-content.component.ts
// File description: Main body content wrapper component for card layouts.
// Author: Alessio Giacché
// Date created: 11-11-2026
// License: MIT
// --------------------------------------------------------------

// Import
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * SpCardContentComponent
 * @version 1.0.0
 * @since 2.0.0
 * @author Alessio Giacché
 */
@Component({
  selector: 'sp-card-content',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="sp-card-content-inner">
      <ng-content></ng-content>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        width: 100%;
      }

      .sp-card-content-inner {
        font-size: 0.875rem;
        line-height: 1.55;
        color: var(--sp-text-secondary, #64748b);
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpCardContentComponent {
  /**
   * Constructor for SpCardContentComponent component
   */
  constructor() {}
}
