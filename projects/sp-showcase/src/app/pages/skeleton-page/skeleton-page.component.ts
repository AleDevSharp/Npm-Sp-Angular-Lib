// --------------------------------------------------------------
// Project: SpLib
// File name: skeleton-page.component.ts
// File description: Showcase documentation page for SpSkeletonComponent.
// Author: Alessio Giacché
// Date created: 11-11-2026
// License: MIT
// --------------------------------------------------------------

// Import
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { SpBtnComponent, SpSkeletonComponent } from '../../../../../sp-lib/src/public-api';
import { TranslatePipe } from '../../i18n/translate.pipe';

/**
 * SkeletonPageComponent
 * Showcase demo and API documentation for SpSkeletonComponent.
 * @version 1.0.0
 * @since 2.0.0
 * @author Alessio Giacché
 */
@Component({
  selector: 'app-skeleton-page',
  standalone: true,
  imports: [TranslatePipe, CommonModule, SpSkeletonComponent, SpBtnComponent],
  templateUrl: './skeleton-page.component.html',
  styleUrl: './skeleton-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkeletonPageComponent {
  // Whether simulated mock data is loaded or in skeleton loading state
  public readonly isLoading = signal<boolean>(true);

  /**
   * Constructor for SkeletonPageComponent component
   */
  constructor() {}

  /**
   * Toggles the loading simulation state.
   * @returns void
   */
  public toggleLoading(): void {
    this.isLoading.update(l => !l);
  }
}
