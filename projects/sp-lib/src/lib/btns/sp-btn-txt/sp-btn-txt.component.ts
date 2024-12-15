import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'sp-btn-txt',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sp-btn-txt.component.html',
  styleUrl: './sp-btn-txt.component.scss'
})
export class SpBtnTxtComponent {
  // The button text
  @Input() text = '';

  // The button color
  @Input() color = '#ffac1c';

  // If the button is disabled or not
  @Input() disabled = false;

  // The button cursor
  @Input() cursor = 'pointer';

  // Handle the output
  @Output() buttonClick = new EventEmitter<void>();

  // Constructor for SButtonTComponent component
  constructor() {}

  /**
   * Click button
   */
  public onClick(): void {
    this.buttonClick.emit();
  }
}
