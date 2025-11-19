import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';

/**
 * SpBtnTxtComponent component
 * @author Alessio Giacché
 * @version 1.0.0
 * @since 1.0.2
 */
@Component({
  selector: 'sp-btn-txt',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sp-btn-txt.component.html',
  styleUrl: './sp-btn-txt.component.scss'
})
export class SpBtnTxtComponent {
  // The button text
  public text = input<string>('');

  // The button color
  public color = input<string>('#ffac1c');

  // If the button is disabled or not
  public disabled = input<boolean>(false);

  // The button cursor
  public cursor = input<string>('pointer');

  // Handle the output
  public buttonClick = output<void>();

  // Constructor for SButtonTComponent component
  constructor() {}

  /**
   * Click button
   */
  public onClick(): void {
    this.buttonClick.emit();
  }
}
