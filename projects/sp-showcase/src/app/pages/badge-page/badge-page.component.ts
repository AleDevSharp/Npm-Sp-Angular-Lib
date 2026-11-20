// --------------------------------------------------------------
// Project: SpLib
// File name: badge-page.component.ts
// File description: Showcase documentation page for SpBadgeComponent.
// Author: Alessio Giacché
// Date created: 11-11-2026
// License: MIT
// --------------------------------------------------------------

// Import
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { SpBadgeComponent, SpBtnComponent } from '../../../../../sp-lib/src/public-api';
import { TranslatePipe } from '../../i18n/translate.pipe';

/**
 * BadgePageComponent
 * Showcase demo and API documentation for SpBadgeComponent.
 * @version 1.0.0
 * @since 2.0.0
 * @author Alessio Giacché
 */
@Component({
  selector: 'app-badge-page',
  standalone: true,
  imports: [TranslatePipe, CommonModule, SpBadgeComponent, SpBtnComponent],
  templateUrl: './badge-page.component.html',
  styleUrl: './badge-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BadgePageComponent {
  // Notification counter signal for interactive increment demo
  public readonly notificationCount = signal<number>(5);

  /**
   * Constructor for BadgePageComponent component
   */
  constructor() {}

  /**
   * Increments the notification count.
   * @returns void
   */
  public incrementCount(): void {
    this.notificationCount.update((c) => c + 15);
  }

  /**
   * Resets the notification count.
   * @returns void
   */
  public resetCount(): void {
    this.notificationCount.set(0);
  }
}
