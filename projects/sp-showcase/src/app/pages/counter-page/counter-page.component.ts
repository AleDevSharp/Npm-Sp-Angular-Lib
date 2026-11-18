// --------------------------------------------------------------
// Project: SpLib
// File name: counter-page.component.ts
// File description: Showcase documentation page for SpCounterComponent.
// Author: Alessio Giacché
// Date created: 11-11-2026
// License: MIT
// --------------------------------------------------------------

// Import
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, viewChildren } from '@angular/core';

import { SpBtnComponent, SpCounterComponent } from '../../../../../sp-lib/src/public-api';
import { TranslatePipe } from '../../i18n/translate.pipe';

/**
 * CounterPageComponent
 * Showcase demo and API documentation for SpCounterComponent.
 * @version 1.0.0
 * @since 2.0.0
 * @author Alessio Giacché
 */
@Component({
  selector: 'app-counter-page',
  standalone: true,
  imports: [TranslatePipe, CommonModule, SpCounterComponent, SpBtnComponent],
  templateUrl: './counter-page.component.html',
  styleUrl: './counter-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CounterPageComponent {
  // The four KPI counter instances controlled by the demo actions
  private readonly counters = viewChildren(SpCounterComponent);

  /**
   * Replays every KPI counter from its configured starting value.
   * @returns void
   */
  public restartCounter(): void {
    this.counters().forEach(counter => counter.start());
  }

  /**
   * Restores every KPI counter to its configured starting value.
   * @returns void
   */
  public resetCounter(): void {
    this.counters().forEach(counter => counter.reset());
  }
}
