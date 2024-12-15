import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'sp-btn',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sp-btn.component.html',
  styleUrl: './sp-btn.component.scss'
})
export class SpBtnComponent {
  // The button text
  @Input() text = '';

  // The button color
  @Input() color = '#ffac1c';

  // The button height
  @Input() height = '30px';

  // The button cursor
  @Input() cursor = 'pointer';

  // If the button is disabled
  @Input() disabled = false;

  // Handle the output
  @Output() buttonClick = new EventEmitter<void>();

  // Constructor for SButtonComponent button
  constructor() {}

  /**
   * Click button
   */
  public onClick(): void {
    this.buttonClick.emit();
  }
}
