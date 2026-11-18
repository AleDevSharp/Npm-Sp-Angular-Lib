// --------------------------------------------------------------
// Project: SpLib
// File name: sp-input.component.ts
// File description: Accessible, themeable form text input component implementing ControlValueAccessor.
// Author: Alessio Giacché
// Date created: 18-11-2025
// License: MIT
// --------------------------------------------------------------

// Import
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, forwardRef, input, model, output, signal } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * SpInputComponent
 * @version 2.0.0
 * @since 2.0.0
 * @author Alessio Giacché
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
  styleUrl: './sp-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpInputComponent implements ControlValueAccessor {
  // The unique identifier for the input field
  public id = input<string>(`sp-input-${Math.random().toString(36).substring(2, 9)}`);

  // The label text displayed above the input
  public label = input<string>('');

  // The HTML input type (text, email, password, number, etc.)
  public type = input<string>('text');

  // The placeholder text
  public placeholder = input<string>('');

  // The two-way model value for the input field
  public value = model<string>('');

  // The external disabled flag input
  public disabled = input<boolean>(false);

  // The readonly attribute flag
  public readonly = input<boolean>(false);

  // The input size preset
  public size = input<'sm' | 'md' | 'lg'>('md');

  // The custom focus border and ring color; falls back to the shared focus token
  public focusColor = input<string>('');

  // The error state flag
  public hasError = input<boolean>(false);

  // The error message text displayed under the field
  public errorMessage = input<string>('');

  // The optional helper/hint text displayed under the field
  public hint = input<string>('');

  // The optional prefix text or icon
  public prefix = input<string>('');

  // The optional suffix text or icon
  public suffix = input<string>('');

  // The custom border color override
  public borderColor = input<string>('');

  // The custom background color override
  public backgroundColor = input<string>('');

  // The custom text color override
  public textColor = input<string>('');

  // The custom border radius override
  public borderRadius = input<string>('');

  // The custom padding override
  public padding = input<string>('');

  // The custom label color override
  public labelColor = input<string>('');

  // The clearable button flag
  public clearable = input<boolean>(false);

  // The output event emitted whenever the input value changes
  public changeInput = output<string>();

  // The output event emitted when the input loses focus
  public inputBlur = output<FocusEvent>();

  // The output event emitted when the input receives focus
  public inputFocus = output<FocusEvent>();

  // Private signal for form control disabled state via ControlValueAccessor
  private readonly _cvaDisabled = signal<boolean>(false);

  // Private signal for internal fallback value
  private readonly _internalValue = signal<string>('');

  // The effective disabled status combining input and form control state
  public readonly effectiveDisabled = computed(() => this.disabled() || this._cvaDisabled());

  // The effective string value to display in the input element
  public readonly displayValue = computed(() => this.value() || this._internalValue());

  // The ControlValueAccessor onChange callback
  private onChange: (val: string) => void = () => {};

  // The ControlValueAccessor onTouched callback
  private onTouched: () => void = () => {};

  /**
   * Constructor for SpInputComponent component
   */
  constructor() {}

  /**
   * Handles user input events and synchronizes signals with Angular forms.
   * @param event The native input DOM event
   * @returns void
   */
  public onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    const newVal = target.value;
    this.value.set(newVal);
    this._internalValue.set(newVal);
    this.changeInput.emit(newVal);
    this.onChange(newVal);
  }

  /**
   * Handles focus event on the input.
   * @param event The native focus event
   * @returns void
   */
  public onFocus(event: FocusEvent): void {
    this.inputFocus.emit(event);
  }

  /**
   * Handles blur event on the input.
   * @param event The native focus event
   * @returns void
   */
  public onBlur(event: FocusEvent): void {
    this.onTouched();
    this.inputBlur.emit(event);
  }

  /**
   * Clears the input field when clearable button is clicked.
   * @returns void
   */
  public clearValue(): void {
    if (this.effectiveDisabled() || this.readonly()) {
      return;
    }
    this.value.set('');
    this._internalValue.set('');
    this.changeInput.emit('');
    this.onChange('');
  }

  /**
   * Writes a new value from the form model into the component.
   * @param obj The incoming value
   * @returns void
   */
  public writeValue(obj: unknown): void {
    const stringVal = obj !== null && obj !== undefined ? String(obj) : '';
    this.value.set(stringVal);
    this._internalValue.set(stringVal);
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
