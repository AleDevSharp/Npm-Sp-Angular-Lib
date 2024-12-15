import { Component, Input } from '@angular/core';

@Component({
  selector: 'sp-progressbar',
  standalone: true,
  imports: [],
  templateUrl: './sp-progressbar.component.html',
  styleUrl: './sp-progressbar.component.scss'
})
export class SpProgressbarComponent {
  // The color
  @Input() color: string = '#ffac1c';

  // Constructor for SProgressbarComponent component
  constructor() {}
}
