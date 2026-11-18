// --------------------------------------------------------------
// Project: SpLib
// File name: sp-select.component.ts
// File description: Accessible, themeable dropdown select component implementing ControlValueAccessor.
// Author: Alessio Giacché
// Date created: 19-11-2025
// License: MIT
// --------------------------------------------------------------

// Import
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, forwardRef, input, model, output, signal } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * SpSelectOption interface
 */
export interface SpSelectOption {
  // The display label of the option
  label: string;

  // The underlying value of the option
  value: string;

  // The optional disabled status for this option
  disabled?: boolean;
}

/**
 * SpSelectComponent
 * @version 2.0.0
 * @since 2.0.0
 * @author Alessio Giacché
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
  styleUrl: './sp-select.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpSelectComponent implements ControlValueAccessor {
  // The unique identifier for the select field
  public id = input<string>(`sp-select-${Math.random().toString(36).substring(2, 9)}`);

  // The label text displayed above the select
  public label = input<string>('');

  // The custom label color override
  public labelColor = input<string>('');

  // The two-way model value for the selected option
  public value = model<string>('');

  // The external disabled flag input
  public disabled = input<boolean>(false);

  // The select size preset
  public size = input<'sm' | 'md' | 'lg'>('md');

  // The custom focus border and ring color; falls back to the shared focus token
  public focusColor = input<string>('');

  // The error state flag
  public hasError = input<boolean>(false);

  // The error message text displayed under the field
  public errorMessage = input<string>('');

  // The list of selectable options
  public options = input<SpSelectOption[]>([]);

  // The placeholder option text
  public placeholder = input<string>('Select an option...');

  // The optional helper/hint text displayed under the field
  public hint = input<string>('');

  // The output event emitted whenever the selection changes
  public changeInput = output<string>();

  // Private signal for form control disabled state via ControlValueAccessor
  private readonly _cvaDisabled = signal<boolean>(false);

  // The effective disabled status combining input and form control state
  public readonly effectiveDisabled = computed(() => this.disabled() || this._cvaDisabled());

  // The effective string value to display
  public readonly displayValue = computed(() => this.value());

  // The ControlValueAccessor onChange callback
  private onChange: (val: string) => void = () => {};

  // The ControlValueAccessor onTouched callback
  private onTouched: () => void = () => {};

  /**
   * Constructor for SpSelectComponent component
   */
  constructor() {}

  /**
   * Handles user selection change and notifies Angular forms.
   * @param event The native change event
   * @returns void
   */
  public onSelectChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const newVal = target.value;
    this.value.set(newVal);
    this.changeInput.emit(newVal);
    this.onChange(newVal);
  }

  /**
   * Handles blur event on the select element.
   * @returns void
   */
  public onBlur(): void {
    this.onTouched();
  }

  /**
   * Writes a new value from the form model into the component.
   * @param obj The incoming value
   * @returns void
   */
  public writeValue(obj: unknown): void {
    const stringVal = obj !== null && obj !== undefined ? String(obj) : '';
    this.value.set(stringVal);
  }

  /**
   * Registers a callback function that should be called when the control value changes in the UI.
   * @param fn The callback function
   * @returns void
   */
  public registerOnChange(fn: (val: string) => void): void {
    this.onChange = fn;
  }

  /**
   * Registers a callback function that should be called when the control receives a blur event.
   * @param fn The callback function
   * @returns void
   */
  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  /**
   * Sets the disabled state when controlled by an Angular form.
   * @param isDisabled Whether the control is disabled
   * @returns void
   */
  public setDisabledState(isDisabled: boolean): void {
    this._cvaDisabled.set(isDisabled);
  }
}
