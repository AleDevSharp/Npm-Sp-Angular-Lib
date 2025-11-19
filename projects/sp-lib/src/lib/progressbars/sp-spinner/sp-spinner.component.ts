import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

/**
 * SpSpinnerComponent component
 * @author Alessio Giacché
 * @version 1.0.0
 * @since 1.0.2
 */
@Component({
  selector: 'sp-spinner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sp-spinner.component.html',
  styleUrl: './sp-spinner.component.scss'
})
export class SpSpinnerComponent {
  // The spinner primary color
  public primaryColor = input<string>('#ffac1c');

  // The size in width
  public size = input<number>(40);

  // The animation speed
  public animationSpeed = input<string>('1s');

  // Constructor for SpSpinnerComponent component
  constructor() {}
}
