import { Component, Input } from '@angular/core';

@Component({
  selector: 'sp-spinner',
  standalone: true,
  imports: [],
  templateUrl: './sp-spinner.component.html',
  styleUrl: './sp-spinner.component.scss'
})
export class SpSpinnerComponent {
  // The spinner primary color
  @Input() primaryColor: string = '#ffac1c';

  // The size in width
  @Input() size: number = 40;

  // The animation speed
  @Input() animationSpeed: string = '1s';

  // Constructor for SSpinnerOneComponent component
  constructor() {}
}
