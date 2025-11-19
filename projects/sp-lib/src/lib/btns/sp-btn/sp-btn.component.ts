import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';

/**
 * SpBtnComponent component
 * @author Alessio Giacché
 * @version 1.0.0
 * @since 1.0.2
 */
@Component({
  selector: 'sp-btn',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sp-btn.component.html',
  styleUrl: './sp-btn.component.scss'
})
export class SpBtnComponent {
  // The button text
  public text = input<string>('');

  // The button color
  public color = input<string>('#ffac1c');

  // The button height
  public height = input<string>('30px');

  // The button cursor
  public cursor = input<string>('pointer');

  // If the button is disabled
  public disabled = input<boolean>(false);

  // Handle the output
  public buttonClick = output<void>();

  // Constructor for SButtonComponent button
  constructor() {}

  /**
   * Click button
   */
  public onClick(): void {
    this.buttonClick.emit();
  }
}
