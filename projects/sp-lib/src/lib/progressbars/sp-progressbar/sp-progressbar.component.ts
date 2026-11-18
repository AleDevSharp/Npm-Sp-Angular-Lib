// --------------------------------------------------------------
// Project: SpLib
// File name: sp-progressbar.component.ts
// File description: Linear progress bar supporting determinate percentage and indeterminate animation modes.
// Author: Alessio Giacché
// Date created: 18-11-2025
// License: MIT
// --------------------------------------------------------------

// Import
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * SpProgressbarComponent
 * @version 2.0.0
 * @since 1.0.2
 * @author Alessio Giacché
 */
@Component({
  selector: 'sp-progressbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sp-progressbar.component.html',
  styleUrl: './sp-progressbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpProgressbarComponent {
  // The progress bar color
  public color = input<string>('#ffac1c');

  // The progress bar height
  public height = input<string>('6px');

  // The determinate percentage value (0 to 100)
  public percentage = input<number>(50);

  // The indeterminate loading flag
  public indeterminate = input<boolean>(false);

  /**
   * Constructor for SpProgressbarComponent component
   */
  constructor() {}
}
