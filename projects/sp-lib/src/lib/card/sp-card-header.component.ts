// --------------------------------------------------------------
// Project: SpLib
// File name: sp-card-header.component.ts
// File description: Composable card header component supporting title, subtitle, avatar, and trailing actions.
// Author: Alessio Giacché
// Date created: 11-11-2026
// License: MIT
// --------------------------------------------------------------

// Import
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * SpCardHeaderComponent
 * @version 1.0.0
 * @since 2.0.0
 * @author Alessio Giacché
 */
@Component({
  selector: 'sp-card-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Region: Header Container -->
    <div class="sp-card-header-inner">
      <!-- Region: Avatar / Leading Slot -->
      <div class="sp-card-header-leading">
        <ng-content select="[avatar],[leading]"></ng-content>
      </div>

      <!-- Region: Title & Subtitle Group -->
      <div class="sp-card-header-text">
        @if (this.title()) {
          <h3 class="sp-card-title">{{ this.title() }}</h3>
        }
        @if (this.subtitle()) {
          <p class="sp-card-subtitle">{{ this.subtitle() }}</p>
        }
        <ng-content select="sp-card-title,sp-card-subtitle,[title],[subtitle]"></ng-content>
      </div>

      <!-- Region: Actions / Trailing Slot -->
      <div class="sp-card-header-trailing">
        <ng-content select="[trailing],[action]"></ng-content>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
    }

    .sp-card-header-inner {
      display: flex;
      align-items: center;
      gap: 12px;
      width: 100%;
    }

    .sp-card-header-leading:empty,
    .sp-card-header-trailing:empty {
      display: none;
    }

    .sp-card-header-text {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 2px;
      min-width: 0;
    }

    .sp-card-title {
      margin: 0;
      font-size: 1.125rem;
      font-weight: 700;
      color: var(--sp-text-primary, #0f172a);
      line-height: 1.3;
    }

    .sp-card-subtitle {
      margin: 0;
      font-size: 0.8125rem;
      color: var(--sp-text-secondary, #64748b);
      line-height: 1.4;
    }

    .sp-card-header-trailing {
      margin-left: auto;
      display: flex;
      align-items: center;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpCardHeaderComponent {
  // The primary title string displayed in header
  public title = input<string>('');

  // The secondary subtitle or description string
  public subtitle = input<string>('');

  /**
   * Constructor for SpCardHeaderComponent component
   */
  constructor() {}
}
