// --------------------------------------------------------------
// Project: SpLib
// File name: sp-switch.component.ts
// File description: Accessible, animated toggle switch component implementing ControlValueAccessor.
// Author: Alessio Giacché
// Date created: 19-11-2025
// License: MIT
// --------------------------------------------------------------

// Import
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, forwardRef, input, model, output, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * SpSwitchComponent
 * @version 2.0.0
 * @since 2.0.0
 * @author Alessio Giacché
 */
@Component({
  selector: 'sp-switch',
  standalone: true,
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SpSwitchComponent),
      multi: true
    }
  ],
  templateUrl: './sp-switch.component.html',
  styleUrl: './sp-switch.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpSwitchComponent implements ControlValueAccessor {
  // The unique identifier for the switch
  public id = input<string>(`sp-switch-${Math.random().toString(36).substring(2, 9)}`);

  // The label text displayed next to the switch
  public label = input<string>('');

  // The label color override
  public labelColor = input<string>('');

  // The two-way model value for the switch toggle state
  public value = model<boolean>(false);

  // The external disabled flag input
  public disabled = input<boolean>(false);

  // The switch size preset
  public size = input<'sm' | 'md' | 'lg'>('md');

  // The error state flag
  public hasError = input<boolean>(false);

  // The error message text
  public errorMessage = input<string>('');

  // The active background color when switched on
  public activeColor = input<string>('');

  // The inactive background color when switched off
  public inactiveColor = input<string>('');

  // The thumb/knob color
  public thumbColor = input<string>('');

  // The custom switch width override
  public width = input<string>('');

  // The custom switch height override
  public height = input<string>('');

  // The output event emitted when the switch value changes
  public changeInput = output<boolean>();

  // Private signal for form control disabled state via ControlValueAccessor
  private readonly _cvaDisabled = signal<boolean>(false);

  // Private signal for internal fallback value
  private readonly _internalValue = signal<boolean>(false);

  // The effective disabled status combining input and form control state
  public readonly effectiveDisabled = computed(() => this.disabled() || this._cvaDisabled());

  // The effective boolean checked state
  public readonly checked = computed(() => this.value() || this._internalValue());

  // The ControlValueAccessor onChange callback
  private onChange: (val: boolean) => void = () => {};

  // The ControlValueAccessor onTouched callback
  private onTouched: () => void = () => {};

  /**
   * Constructor for SpSwitchComponent component
   */
  constructor() {}

  /**
   * Toggles the switch state.
   * @returns void
   */
  public toggle(): void {
    if (this.effectiveDisabled()) {
      return;
    }
    const newVal = !this.checked();
    this.value.set(newVal);
    this._internalValue.set(newVal);
    this.changeInput.emit(newVal);
    this.onChange(newVal);
    this.onTouched();
  }

  /**
   * Handles keyboard interaction (Space or Enter to toggle).
   * @param event The native keyboard event
   * @returns void
   */
  public onKeyDown(event: KeyboardEvent): void {
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      this.toggle();
    }
  }

  /**
   * Handles native change event on the hidden checkbox.
   * @param event The change event
   * @returns void
   */
  public onInputChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const newVal = target.checked;
    this.value.set(newVal);
    this._internalValue.set(newVal);
    this.changeInput.emit(newVal);
    this.onChange(newVal);
    this.onTouched();
  }

  /**
   * Writes a new value from the form model into the component.
   * @param obj The incoming value
   * @returns void
   */
  public writeValue(obj: unknown): void {
    const boolVal = Boolean(obj);
    this.value.set(boolVal);
    this._internalValue.set(boolVal);
  }

  /**
   * Registers a callback function that should be called when the control value changes in the UI.
   * @param fn The callback function
   * @returns void
   */
  public registerOnChange(fn: (val: boolean) => void): void {
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
