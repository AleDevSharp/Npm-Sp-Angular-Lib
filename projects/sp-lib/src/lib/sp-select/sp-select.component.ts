import { CommonModule } from '@angular/common';
import { Component, forwardRef, input, output } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * SpSelectComponent component
 * @author Alessio Giacché
 * @version 1.0.0
 * @since 2.0.0
 */
@Component({
  selector: 'sp-select',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SpSelectComponent),
      multi: true
    }
  ],
  templateUrl: './sp-select.component.html',
  styleUrl: './sp-select.component.scss'
})
export class SpSelectComponent implements ControlValueAccessor {
  // The unique ID
  public id = input<string>('');

  // The label
  public label = input<string>('');

  // The label color
  public labelColor = input<string>('var(--secondary-color)');

  // The value
  public value = input<string>('');

  // Disable flag
  public disabled = input<boolean>(false);

  // The error state
  public hasError = input<boolean>(false);

  // The error message
  public errorMessage = input<string>('');

  // Options [{label, value}]
  public options = input<{ label: string; value: string }[]>([]);

  // The Optional placeholder
  public placeholder = input<string>('Select...');

  // Output change
  public changeInput = output<string>();

  // ControlValueAccessor callbacks
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private onChange = (_: any) => {};
  private onTouched = () => {};

  /**
   * Called on change in select
   */
  public onSelectChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.value.apply(target.value);
    this.changeInput.emit(target.value);

    // Angular Forms
    this.onChange(target.value);
    this.onTouched();
  }

  /**
   * Write value from ngModel/FormControl
   */
  writeValue(obj: any): void {
    this.value.apply(obj);
  }

  /**
   * Register callback for changes
   */
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  /**
   * Register callback for touch
   */
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  /**
   * Optional: handle disabled state
   */
  setDisabledState?(isDisabled: boolean): void {
    this.disabled.apply(isDisabled);
  }
}
