// --------------------------------------------------------------
// Project: SpLib
// File name: sp-btn.component.ts
// File description: Customizable, accessible button component with variants, sizing, and loading states.
// Author: Alessio Giacché
// Date created: 18-11-2025
// License: MIT
// --------------------------------------------------------------

// Import
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

/**
 * SpBtnComponent
 * @version 2.0.0
 * @since 1.0.2
 * @author Alessio Giacché
 */
@Component({
  selector: 'sp-btn',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sp-btn.component.html',
  styleUrl: './sp-btn.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpBtnComponent {
  // The button text
  public text = input<string>('');

  // The button visual variant
  public variant = input<'solid' | 'outline' | 'ghost'>('solid');

  // The button size preset
  public size = input<'sm' | 'md' | 'lg'>('md');

  // The custom button background/accent color
  public color = input<string>('#ffac1c');

  // The button custom height override
  public height = input<string>('');

  // The button cursor style
  public cursor = input<string>('pointer');

  // The button disabled flag
  public disabled = input<boolean>(false);

  // The button loading state flag
  public loading = input<boolean>(false);

  // The native button type
  public type = input<'button' | 'submit' | 'reset'>('button');

  // The button click output event
  public buttonClick = output<void>();

  /**
   * Constructor for SpBtnComponent component
   */
  constructor() {}

  /**
   * Handles button click event and emits output if not disabled or loading.
   * @param event The native mouse event
   * @returns void
   */
  public onClick(event: MouseEvent): void {
    if (this.disabled() || this.loading()) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    this.buttonClick.emit();
  }
}
