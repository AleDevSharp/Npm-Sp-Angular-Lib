// --------------------------------------------------------------
// Project: SpLib
// File name: sp-spinner.component.ts
// File description: Accessible circular loading spinner with configurable size, speed, and color.
// Author: Alessio Giacché
// Date created: 18-11-2025
// License: MIT
// --------------------------------------------------------------

// Import
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * SpSpinnerComponent
 * @version 2.0.0
 * @since 1.0.2
 * @author Alessio Giacché
 */
@Component({
  selector: 'sp-spinner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sp-spinner.component.html',
  styleUrl: './sp-spinner.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpSpinnerComponent {
  // The primary color of the spinner
  public primaryColor = input<string>('#ffac1c');

  // The diameter size of the spinner in pixels
  public size = input<number>(36);

  // The rotation animation speed duration
  public animationSpeed = input<string>('0.8s');

  /**
   * Constructor for SpSpinnerComponent component
   */
  constructor() {}
}
