// --------------------------------------------------------------
// Project: SpLib
// File name: progress-bars-page.component.ts
// File description: Showcase documentation page for SpProgressbar, SpProgressbarCircular, SpProgressbarRounded and SpSpinner.
// Author: Alessio Giacché
// Date created: 18-11-2025
// License: MIT
// --------------------------------------------------------------

// Import
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import {
  SpBtnComponent,
  SpProgressbarCircularComponent,
  SpProgressbarComponent,
  SpProgressbarRoundedComponent,
  SpSpinnerComponent
} from '../../../../../sp-lib/src/public-api';
import { TranslatePipe } from '../../i18n/translate.pipe';

/**
 * ProgressBarsPageComponent
 * @version 2.0.0
 * @since 2.0.0
 * @author Alessio Giacché
 */
@Component({
  selector: 'app-progress-bars-page',
  standalone: true,
  imports: [
    TranslatePipe,
    CommonModule,
    SpBtnComponent,
    SpProgressbarComponent,
    SpProgressbarRoundedComponent,
    SpProgressbarCircularComponent,
    SpSpinnerComponent
  ],
  templateUrl: './progress-bars-page.component.html',
  styleUrl: './progress-bars-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProgressBarsPageComponent {
  // Reactive progress percentage signal
  public readonly dynamicPercentage = signal<number>(45);

  // Indeterminate loading state toggle signal
  public readonly isIndeterminate = signal<boolean>(false);

  /**
   * Constructor for ProgressBarsPageComponent component
   */
  constructor() {}

  /**
   * Increases progress by 15%.
   * @returns void
   */
  public increase(): void {
    this.dynamicPercentage.update((v) => Math.min(v + 15, 100));
  }

  /**
   * Decreases progress by 15%.
   * @returns void
   */
  public decrease(): void {
    this.dynamicPercentage.update((v) => Math.max(v - 15, 0));
  }

  /**
   * Toggles indeterminate animation mode.
   * @returns void
   */
  public toggleIndeterminate(): void {
    this.isIndeterminate.set(!this.isIndeterminate());
  }
}
