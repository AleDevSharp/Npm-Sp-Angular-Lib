import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

/**
 * SpProgressbarComponent component
 * @author Alessio Giacché
 * @version 1.0.0
 * @since 1.0.2
 */
@Component({
  selector: 'sp-progressbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sp-progressbar.component.html',
  styleUrl: './sp-progressbar.component.scss'
})
export class SpProgressbarComponent {
  // The color
  public color = input<string>('#ffac1c');

  // The height
  public height = input<string>('7px');

  // The percentage
  public percentage = input<number>(50);

  // The indeterminate flag
  public indeterminate = input<boolean>(true);

  // Constructor for SProgressbarComponent component
  constructor() {}
}
