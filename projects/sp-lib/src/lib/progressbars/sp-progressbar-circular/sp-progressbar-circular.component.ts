// --------------------------------------------------------------
// Project: SpLib
// File name: sp-progressbar-circular.component.ts
// File description: Circular SVG progress bar with smooth stroke animations and percentage indicator.
// Author: Alessio Giacché
// Date created: 18-11-2025
// License: MIT
// --------------------------------------------------------------

// Import
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/**
 * SpProgressbarCircularComponent
 * @version 2.0.0
 * @since 1.0.2
 * @author Alessio Giacché
 */
@Component({
  selector: 'sp-progressbar-circular',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sp-progressbar-circular.component.html',
  styleUrl: './sp-progressbar-circular.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpProgressbarCircularComponent {
  // The diameter size of the circular progress bar in pixels
  public size = input<number>(80);

  // The stroke thickness in pixels
  public stroke = input<number>(8);

  // The determinate percentage value (0 to 100)
  public percentage = input<number>(50);

  // The stroke accent color
  public color = input<string>('#ffac1c');

  // The indeterminate spinning flag
  public indeterminate = input<boolean>(false);

  // The radius of the inner circle
  public readonly radius = 45;

  // The circumference of the inner circle
  public readonly circumference = 2 * Math.PI * 45;

  // The computed dash offset based on percentage
  public readonly dashOffset = computed(() => {
    const clamped = Math.min(Math.max(this.percentage(), 0), 100);
    return this.circumference * (1 - clamped / 100);
  });

  /**
   * Constructor for SpProgressbarCircularComponent component
   */
  constructor() {}
}
