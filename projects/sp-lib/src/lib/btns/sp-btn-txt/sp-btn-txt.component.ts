// --------------------------------------------------------------
// Project: SpLib
// File name: sp-btn-txt.component.ts
// File description: Text/link style button component with accessible states.
// Author: Alessio Giacché
// Date created: 18-11-2025
// License: MIT
// --------------------------------------------------------------

// Import
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

/**
 * SpBtnTxtComponent
 * @version 2.0.0
 * @since 1.0.2
 * @author Alessio Giacché
 */
@Component({
  selector: 'sp-btn-txt',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sp-btn-txt.component.html',
  styleUrl: './sp-btn-txt.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpBtnTxtComponent {
  // The button text
  public text = input<string>('');

  // The text color
  public color = input<string>('#ffac1c');

  // The button disabled flag
  public disabled = input<boolean>(false);

  // The cursor style
  public cursor = input<string>('pointer');

  // The button click output event
  public buttonClick = output<void>();

  /**
   * Constructor for SpBtnTxtComponent component
   */
  constructor() {}

  /**
   * Handles button click and emits output if not disabled.
   * @param event The native mouse event
   * @returns void
   */
  public onClick(event?: MouseEvent): void {
    if (this.disabled()) {
      event?.preventDefault();
      return;
    }
    this.buttonClick.emit();
  }
}
