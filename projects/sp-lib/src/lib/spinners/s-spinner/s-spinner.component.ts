import { Component, Input } from '@angular/core';

@Component({
  selector: 's-spinner',
  standalone: true,
  imports: [],
  templateUrl: './s-spinner.component.html',
  styleUrl: './s-spinner.component.scss'
})
export class SSpinnerComponent {
  // The spinner primary color
  @Input() primaryColor: string = '#ffac1c';

  // The size in width
  @Input() size: number = 40;

  // The animation speed
  @Input() animationSpeed: string = '1s';

  // Constructor for SSpinnerOneComponent component
  constructor() {}
}
