import { CommonModule } from '@angular/common';
import { Component, forwardRef, input, output } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * SpInputComponent component
 * @author Alessio Giacché
 * @version 1.0.0
 * @since 2.0.0
 */
@Component({
  selector: 'sp-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SpInputComponent),
      multi: true
    }
  ],
  templateUrl: './sp-input.component.html',
  styleUrl: './sp-input.component.scss'
})
export class SpInputComponent implements ControlValueAccessor {
  // Unique ID for the input field
  public id = input<string>('');

  // Label text displayed above the input
  public label = input<string>('');

  // Input type (text, email, password, number, etc.)
  public type = input<string>('text');

  // Placeholder text
  public placeholder = input<string>('');

  // Input value
  public value = input<string>('');

  // Whether the input is disabled
  public disabled = input<boolean>(false);

  // Whether the input is in error state
  public hasError = input<boolean>(false);

  // Error message shown under the input
  public errorMessage = input<string>('');

  // Optional prefix text/icon
  public prefix = input<string>('');

  // Optional suffix text/icon
  public suffix = input<string>('');

  // Border color
  public borderColor = input<string>('#ccc');

  // Background color
  public backgroundColor = input<string>('#ffffff');

  // Text color
  public textColor = input<string>('#333');

  // Border radius (ex: "4px", "10px")
  public borderRadius = input<string>('4px');

  // Padding inside the input container
  public padding = input<string>('8px');

  // Label color
  public labelColor = input<string>('var(--secondary-color)');

  // Emits whenever the input value changes
  public changeInput = output<string>();

  // Callbacks Angular Forms
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private onChange = (_: any) => {};
  private onTouched = () => {};

  /**
   * Handles input event and updates the value signal
   */
  public onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.value.apply(target.value);
    this.changeInput.emit(target.value);

    // Angular Forms
    this.onChange(target.value);
    this.onTouched();
  }

  /**
   * Write value from ngModel/FormControl
   */
  public writeValue(obj: any): void {
    this.value.apply(obj);
  }

  /**
   * Register callback for changes
   */
  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  /**
   * Register callback for touch
   */
  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  /**
   * Optional: handle disabled state
   */
  public setDisabledState?(isDisabled: boolean): void {
    this.disabled.apply(isDisabled);
  }
}
