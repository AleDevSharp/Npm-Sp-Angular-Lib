// --------------------------------------------------------------
// Project: SpLib
// File name: card-page.component.ts
// File description: Showcase documentation page for SpCardComponent and its composable elements.
// Author: Alessio Giacché
// Date created: 11-11-2026
// License: MIT
// --------------------------------------------------------------

// Import
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import {
  SpBtnComponent,
  SpCardActionsComponent,
  SpCardComponent,
  SpCardContentComponent,
  SpCardFooterComponent,
  SpCardHeaderComponent,
  SpCardMediaComponent
} from '../../../../../sp-lib/src/public-api';
import { TranslatePipe } from '../../i18n/translate.pipe';

/**
 * CardPageComponent
 * @version 1.0.0
 * @since 2.0.0
 * @author Alessio Giacché
 */
@Component({
  selector: 'app-card-page',
  standalone: true,
  imports: [TranslatePipe, 
    CommonModule,
    SpBtnComponent,
    SpCardComponent,
    SpCardHeaderComponent,
    SpCardMediaComponent,
    SpCardContentComponent,
    SpCardActionsComponent,
    SpCardFooterComponent
  ],
  templateUrl: './card-page.component.html',
  styleUrl: './card-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardPageComponent {
  // Click feedback message for interactive card demonstration
  public readonly cardFeedback = signal<string>('');

  /**
   * Constructor for CardPageComponent component
   */
  constructor() {}

  /**
   * Handles interactive card click event.
   * @param name The name of the clicked card
   * @returns void
   */
  public handleCardClick(name: string): void {
    this.cardFeedback.set(`Hai cliccato su: ${name}!`);
    setTimeout(() => this.cardFeedback.set(''), 3000);
  }
}
