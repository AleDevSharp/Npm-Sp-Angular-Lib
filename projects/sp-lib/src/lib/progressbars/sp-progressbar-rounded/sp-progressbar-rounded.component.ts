// --------------------------------------------------------------
// Project: SpLib
// File name: sp-progressbar-rounded.component.ts
// File description: Rounded progress bar component with embedded percentage indicator.
// Author: Alessio Giacché
// Date created: 18-11-2025
// License: MIT
// --------------------------------------------------------------

// Import
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * SpProgressbarRoundedComponent
 * @version 2.0.0
 * @since 1.0.2
 * @author Alessio Giacché
 */
@Component({
  selector: 'sp-progressbar-rounded',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sp-progressbar-rounded.component.html',
  styleUrl: './sp-progressbar-rounded.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpProgressbarRoundedComponent {
  // The progress bar fill color
  public color = input<string>('#ffac1c');

  // The progress bar height
  public height = input<string>('16px');

  // The determinate percentage value (0 to 100)
  public percentage = input<number>(60);

  // Whether to show the percentage text inside the bar
  public showText = input<boolean>(true);

  /**
   * Constructor for SpProgressbarRoundedComponent component
   */
  constructor() {}
}
