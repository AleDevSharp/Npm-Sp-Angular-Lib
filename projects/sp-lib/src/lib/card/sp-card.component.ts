// --------------------------------------------------------------
// Project: SpLib
// File name: sp-card.component.ts
// File description: Modern, composable card container component supporting glassmorphism, elevation, and hover motion.
// Author: Alessio Giacché
// Date created: 11-11-2026
// License: MIT
// --------------------------------------------------------------

// Import
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

import { SpCardSize, SpCardVariant } from './sp-card.types';

/**
 * SpCardComponent
 * @version 1.0.0
 * @since 2.0.0
 * @author Alessio Giacché
 */
@Component({
  selector: 'sp-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sp-card.component.html',
  styleUrl: './sp-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpCardComponent {
  // The visual styling variant of the card
  public variant = input<SpCardVariant>('elevated');

  // The padding scale size preset
  public size = input<SpCardSize>('md');

  // Whether the card exhibits 3D micro-lift motion on hover
  public interactive = input<boolean>(false);

  // Whether the entire card acts as a clickable interactive element
  public clickable = input<boolean>(false);

  // The output event emitted when a clickable card is clicked
  public cardClick = output<void>();

  /**
   * Constructor for SpCardComponent component
   */
  constructor() {}

  /**
   * Handles click event on the card.
   * @returns void
   */
  public onClick(): void {
    if (this.clickable()) {
      this.cardClick.emit();
    }
  }

  /**
   * Handles keyboard interaction for clickable cards.
   * @param event The native keyboard event
   * @returns void
   */
  public onKeyDown(event: KeyboardEvent): void {
    if (this.clickable() && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      this.cardClick.emit();
    }
  }
}
