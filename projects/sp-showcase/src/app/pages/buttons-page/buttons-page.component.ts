// --------------------------------------------------------------
// Project: SpLib
// File name: buttons-page.component.ts
// File description: Showcase documentation page for SpBtnComponent and SpBtnTxtComponent.
// Author: Alessio Giacché
// Date created: 18-11-2025
// License: MIT
// --------------------------------------------------------------

// Import
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { SpBtnComponent, SpBtnTxtComponent } from '../../../../../sp-lib/src/public-api';
import { TranslatePipe } from '../../i18n/translate.pipe';

/**
 * ButtonsPageComponent
 * @version 2.0.0
 * @since 2.0.0
 * @author Alessio Giacché
 */
@Component({
  selector: 'app-buttons-page',
  standalone: true,
  imports: [TranslatePipe, CommonModule, SpBtnComponent, SpBtnTxtComponent],
  templateUrl: './buttons-page.component.html',
  styleUrl: './buttons-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonsPageComponent {
  // Loading state toggle signal for demonstration
  public readonly isLoading = signal<boolean>(false);

  // Status message signal for button click events
  public readonly clickFeedback = signal<string>('');

  /**
   * Constructor for ButtonsPageComponent component
   */
  constructor() {}

  /**
   * Toggles the interactive loading state.
   * @returns void
   */
  public toggleLoading(): void {
    this.isLoading.set(!this.isLoading());
  }

  /**
   * Shows a click feedback message.
   * @param message The feedback message to display
   * @returns void
   */
  public handleButtonClick(message: string): void {
    this.clickFeedback.set(message);
    setTimeout(() => this.clickFeedback.set(''), 2500);
  }
}
