import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

/**
 * SpProgressbarRoundedComponent component
 * @author Alessio Giacché
 * @version 1.0.0
 * @since 1.0.2
 */
@Component({
  selector: 'sp-progressbar-rounded',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sp-progressbar-rounded.component.html',
  styleUrl: './sp-progressbar-rounded.component.scss'
})
export class SpProgressbarRoundedComponent {
  // The color
  color = input<string>('#2196f3');

  // The height
  public height = input<string>('15px');

  // The percentage
  public percentage = input<number>(60);

  // If we want to show text
  public showText = input<boolean>(true);

  /**
   * Constructor for SpProgressbarRoundedComponent component
   */
  constructor() {}
}
