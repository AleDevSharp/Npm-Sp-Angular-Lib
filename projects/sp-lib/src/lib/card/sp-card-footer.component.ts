// --------------------------------------------------------------
// Project: SpLib
// File name: sp-card-footer.component.ts
// File description: Footer container component for card metadata and supplementary content.
// Author: Alessio Giacché
// Date created: 11-11-2026
// License: MIT
// --------------------------------------------------------------

// Import
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * SpCardFooterComponent
 * @version 1.0.0
 * @since 2.0.0
 * @author Alessio Giacché
 */
@Component({
  selector: 'sp-card-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="sp-card-footer-inner">
      <ng-content></ng-content>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        width: 100%;
        border-top: 1px solid var(--sp-border-color, #e2e8f0);
        padding-top: 12px;
      }

      .sp-card-footer-inner {
        font-size: 0.8125rem;
        color: var(--sp-text-muted, #94a3b8);
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpCardFooterComponent {
  /**
   * Constructor for SpCardFooterComponent component
   */
  constructor() {}
}
