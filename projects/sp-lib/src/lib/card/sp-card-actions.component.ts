// --------------------------------------------------------------
// Project: SpLib
// File name: sp-card-actions.component.ts
// File description: Action buttons row container component for cards with flexible alignment.
// Author: Alessio Giacché
// Date created: 11-11-2026
// License: MIT
// --------------------------------------------------------------

// Import
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { SpCardActionsAlignment } from './sp-card.types';

/**
 * SpCardActionsComponent
 * @version 1.0.0
 * @since 2.0.0
 * @author Alessio Giacché
 */
@Component({
  selector: 'sp-card-actions',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="sp-card-actions-inner"
      [class.align-start]="this.align() === 'start'"
      [class.align-center]="this.align() === 'center'"
      [class.align-end]="this.align() === 'end'"
      [class.align-between]="this.align() === 'between'">
      <ng-content></ng-content>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        width: 100%;
      }

      .sp-card-actions-inner {
        display: flex;
        align-items: center;
        gap: 10px;
        flex-wrap: wrap;

        &.align-start {
          justify-content: flex-start;
        }

        &.align-center {
          justify-content: center;
        }

        &.align-end {
          justify-content: flex-end;
        }

        &.align-between {
          justify-content: space-between;
        }
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpCardActionsComponent {
  // Horizontal alignment of action elements
  public align = input<SpCardActionsAlignment>('end');

  /**
   * Constructor for SpCardActionsComponent component
   */
  constructor() {}
}
