import { Component, Input } from '@angular/core';

@Component({
  selector: 's-progressbar',
  standalone: true,
  imports: [],
  templateUrl: './s-progressbar.component.html',
  styleUrl: './s-progressbar.component.scss'
})
export class SProgressbarComponent {
  // The color
  @Input() color: string = '#ffac1c';

  // Constructor for SProgressbarComponent component
  constructor() {}
}
