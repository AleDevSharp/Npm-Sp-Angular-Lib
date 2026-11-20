// --------------------------------------------------------------
// Project: SpLib
// File name: sp-toggle-list.component.ts
// File description: Option cards toggle list component with integrated radio/checkbox and animated checkmark.
// Author: Alessio Giacché
// Date created: 11-11-2026
// License: MIT
// --------------------------------------------------------------

// Import
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, forwardRef, input, model, output, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { SpToggleListLayout, SpToggleListMode, SpToggleListOption } from './sp-toggle-list.types';

/**
 * SpToggleListComponent
 * Professional option cards list with animated checkmarks/radios and reactive forms support.
 * @version 1.0.0
 * @since 2.0.0
 * @author Alessio Giacché
 */
@Component({
  selector: 'sp-toggle-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sp-toggle-list.component.html',
  styleUrl: './sp-toggle-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SpToggleListComponent),
      multi: true
    }
  ]
})
export class SpToggleListComponent<T = any> implements ControlValueAccessor {
  // The available option cards configuration
  public options = input<SpToggleListOption<T>[]>([]);

  // The selection mode: single radio or multiple checkboxes
  public mode = input<SpToggleListMode>('single');

  // The visual layout arrangement: vertical stacked or grid
  public layout = input<SpToggleListLayout>('vertical');

  // The number of columns when layout is grid
  public columns = input<number>(2);

  // Whether the entire toggle list is disabled
  public disabled = input<boolean>(false);

  // The model value: single value or array of values
  public value = model<any>();

  // Output event emitted when selection state changes
  public selectionChange = output<any>();

  // Internal signal indicating if the control has been touched
  public isTouched = signal<boolean>(false);

  // Internal signal indicating if forms disabled state is active
  public isFormsDisabled = signal<boolean>(false);

  // Registered onChange callback function for ControlValueAccessor
  private onChange: (value: any) => void = () => {};

  // Registered onTouched callback function for ControlValueAccessor
  private onTouched: () => void = () => {};

  /**
   * Constructor for SpToggleListComponent component
   */
  constructor() {}

  /**
   * Checks whether a specific option card is currently selected.
   * @param option The option card to inspect
   * @returns boolean Whether the option is selected
   */
  public isSelected(option: SpToggleListOption<T>): boolean {
    const val = this.value();
    if (this.mode() === 'multiple') {
      return Array.isArray(val) && val.includes(option.value);
    }
    return val === option.value;
  }

  /**
   * Toggles selection of an option card.
   * @param option The option card to toggle
   * @returns void
   */
  public toggleOption(option: SpToggleListOption<T>): void {
    if (this.isControlDisabled() || option.disabled) {
      return;
    }

    if (this.mode() === 'multiple') {
      const currentList: T[] = Array.isArray(this.value()) ? [...this.value()] : [];
      const itemIndex = currentList.indexOf(option.value);

      if (itemIndex > -1) {
        currentList.splice(itemIndex, 1);
      } else {
        currentList.push(option.value);
      }

      this.value.set(currentList);
      this.onChange(currentList);
      this.selectionChange.emit(currentList);
    } else {
      if (this.value() !== option.value) {
        this.value.set(option.value);
        this.onChange(option.value);
        this.selectionChange.emit(option.value);
      }
    }

    this.markAsTouched();
  }

  /**
   * Handles keyboard interaction (Enter / Space) to toggle cards.
   * @param event The keyboard event
   * @param option The option card being interacted with
   * @returns void
   */
  public onKeyDown(event: KeyboardEvent, option: SpToggleListOption<T>): void {
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      this.toggleOption(option);
    }
  }

  /**
   * Marks the control as touched.
   * @returns void
   */
  public markAsTouched(): void {
    if (!this.isTouched()) {
      this.isTouched.set(true);
      this.onTouched();
    }
  }

  /**
   * Determines if the control is disabled.
   * @returns boolean Whether the control is disabled
   */
  public isControlDisabled(): boolean {
    return this.disabled() || this.isFormsDisabled();
  }

  // --------------------------------------------------------------
  // ControlValueAccessor Implementation
  // --------------------------------------------------------------

  /**
   * Writes a new value from the form model into the component.
   * @param value The new value
   * @returns void
   */
  public writeValue(value: any): void {
    this.value.set(value);
  }

  /**
   * Registers a callback function to propagate changes to the form model.
   * @param fn The callback function
   * @returns void
   */
  public registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  /**
   * Registers a callback function to propagate touch events to the form model.
   * @param fn The callback function
   * @returns void
   */
  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  /**
   * Updates the disabled state from the form model.
   * @param isDisabled Whether the form control is disabled
   * @returns void
   */
  public setDisabledState(isDisabled: boolean): void {
    this.isFormsDisabled.set(isDisabled);
  }
}
