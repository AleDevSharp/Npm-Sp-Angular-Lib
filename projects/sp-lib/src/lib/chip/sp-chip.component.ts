// --------------------------------------------------------------
// Project: SpLib
// File name: sp-chip.component.ts
// File description: Interactive, removable chip component with exit animation and keyboard accessibility.
// Author: Alessio Giacché
// Date created: 11-11-2026
// License: MIT
// --------------------------------------------------------------

// Import
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  OnDestroy,
  output,
  signal
} from '@angular/core';

import { SpChipColor, SpChipSize, SpChipVariant } from './sp-chip.types';

/**
 * SpChipComponent
 * Interactive compact chip supporting icons, removable close action with exit motion, and keyboard triggers.
 * @version 1.0.0
 * @since 2.0.0
 * @author Alessio Giacché
 */
@Component({
  selector: 'sp-chip',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sp-chip.component.html',
  styleUrl: './sp-chip.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpChipComponent implements OnDestroy {
  // The primary text label of the chip
  public label = input<string>('');

  // The visual styling variant
  public variant = input<SpChipVariant>('soft');

  // The semantic color scheme
  public color = input<SpChipColor>('default');

  // The size scale preset
  public size = input<SpChipSize>('md');

  // Whether the chip displays an interactive remove button
  public removable = input<boolean>(false);

  // Whether the chip is clickable as an interactive filter or action
  public clickable = input<boolean>(false);

  // Whether the chip is currently in a selected active state
  public selected = input<boolean>(false);

  // Whether the chip is disabled
  public disabled = input<boolean>(false);

  // Optional SVG markup or icon identifier placed before label
  public icon = input<string | undefined>(undefined);

  // Output event emitted when the chip itself is clicked
  public chipClick = output<void>();

  // Output event emitted when the remove button or delete key is pressed
  public remove = output<void>();

  // Internal state tracking the exit animation phase
  public isExiting = signal<boolean>(false);

  // Internal state tracking when the element is completely removed from view
  public isRemoved = signal<boolean>(false);

  // The pending exit-animation completion timer
  private removalTimeout: ReturnType<typeof setTimeout> | null = null;

  /**
   * Constructor for SpChipComponent component
   */
  constructor() {}

  /**
   * Handles click on the chip.
   * @returns void
   */
  public onClick(): void {
    if (!this.disabled() && this.clickable()) {
      this.chipClick.emit();
    }
  }

  /**
   * Handles click on the remove button, triggering smooth exit motion.
   * @param event The mouse or keyboard event
   * @returns void
   */
  public onRemove(event: Event): void {
    event.stopPropagation();

    if (this.disabled() || this.isExiting() || this.isRemoved()) {
      return;
    }

    this.isExiting.set(true);
    this.removalTimeout = setTimeout(() => {
      this.removalTimeout = null;
      this.isRemoved.set(true);
      this.remove.emit();
    }, 220);
  }

  /**
   * Handles keyboard navigation on the chip.
   * @param event The keyboard event
   * @returns void
   */
  public onKeyDown(event: KeyboardEvent): void {
    if (this.disabled()) {
      return;
    }

    if ((event.key === 'Delete' || event.key === 'Backspace') && this.removable()) {
      event.preventDefault();
      this.onRemove(event);
    } else if ((event.key === 'Enter' || event.key === ' ') && this.clickable()) {
      event.preventDefault();
      this.onClick();
    }
  }

  /**
   * Cancels pending removal when the component is destroyed.
   * @returns void
   */
  public ngOnDestroy(): void {
    if (this.removalTimeout !== null) {
      clearTimeout(this.removalTimeout);
      this.removalTimeout = null;
    }
  }
}
