import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';

/**
 * SpSwitchComponent component
 * @author Alessio Giacché
 * @version 1.0.0
 * @since 2.0.0
 */
@Component({
  selector: 'sp-switch',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sp-switch.component.html',
  styleUrl: './sp-switch.component.scss'
})
export class SpSwitchComponent {
  // Unique ID for the switch
  public id = input<string>('');

  // Label text
  public label = input<string>('');

  // Label color
  public labelColor = input<string>('var(--primary-color)');

  // Checked value
  public value = input<boolean>(false);

  // Disabled flag
  public disabled = input<boolean>(false);

  // Error state
  public hasError = input<boolean>(false);

  // Error message
  public errorMessage = input<string>('');

  // Slider active color
  public activeColor = input<string>('var(--primary-color)');

  // Slider inactive color
  public inactiveColor = input<string>('#ccc');

  // Slider thumb color
  public thumbColor = input<string>('#fff');

  // Switch dimensions
  public width = input<string>('40px');
  public height = input<string>('20px');

  // Emit changes
  public changeInput = output<boolean>();

  /**
   * Handle change event
   */
  public onChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.value.apply(target.checked);
    this.changeInput.emit(target.checked);
  }
}
