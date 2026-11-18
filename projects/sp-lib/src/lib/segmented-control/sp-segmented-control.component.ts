// --------------------------------------------------------------
// Project: SpLib
// File name: sp-segmented-control.component.ts
// File description: High-performance segmented pill switch with animated sliding indicator and reactive forms integration.
// Author: Alessio Giacché
// Date created: 11-11-2026
// License: MIT
// --------------------------------------------------------------

// Import
import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  forwardRef,
  input,
  model,
  OnDestroy,
  output,
  signal,
  viewChildren
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { SpSegmentedControlOption, SpSegmentedControlSize } from './sp-segmented-control.types';

/**
 * SpSegmentedControlComponent
 * Segmented pill switch with physical sliding indicator, keyboard navigation, and reactive forms support.
 * @version 1.0.0
 * @since 2.0.0
 * @author Alessio Giacché
 */
@Component({
  selector: 'sp-segmented-control',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sp-segmented-control.component.html',
  styleUrl: './sp-segmented-control.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SpSegmentedControlComponent),
      multi: true
    }
  ]
})
export class SpSegmentedControlComponent<T = any> implements ControlValueAccessor, AfterViewInit, OnDestroy {
  // The available segmented control options
  public options = input<SpSegmentedControlOption<T>[]>([]);

  // The size preset of the segmented control
  public size = input<SpSegmentedControlSize>('md');

  // Whether the control expands to fill the entire container width
  public fullWidth = input<boolean>(false);

  // Whether the entire segmented control is disabled
  public disabled = input<boolean>(false);

  // The active selected option value
  public value = model<T>();

  // Output event emitted whenever the selection changes
  public selectionChange = output<T>();

  // Internal signal indicating if the control has been touched
  public isTouched = signal<boolean>(false);

  // Internal signal indicating if forms disabled state is active
  public isFormsDisabled = signal<boolean>(false);

  // Indicator left offset position in pixels
  public indicatorLeft = signal<number>(0);

  // Indicator top offset position in pixels
  public indicatorTop = signal<number>(0);

  // Indicator width in pixels
  public indicatorWidth = signal<number>(0);

  // Indicator height in pixels
  public indicatorHeight = signal<number>(0);

  // Whether the indicator is visible and ready
  public indicatorReady = signal<boolean>(false);

  // The root container element reference
  public containerRef = signal<HTMLElement | null>(null);

  // References to all option button elements
  private optionButtons = viewChildren<ElementRef<HTMLButtonElement>>('optionBtn');

  // Registered onChange callback function for ControlValueAccessor
  private onChange: (value: T) => void = () => {};

  // Registered onTouched callback function for ControlValueAccessor
  private onTouched: () => void = () => {};

  // ResizeObserver instance to recompute indicator metrics on resize
  private resizeObserver: ResizeObserver | null = null;

  /**
   * Constructor for SpSegmentedControlComponent component
   * @param hostElement The injected host element reference
   */
  constructor(private hostElement: ElementRef<HTMLElement>) {}

  /**
   * Lifecycle hook invoked after the view has been initialized.
   * @returns void
   */
  public ngAfterViewInit(): void {
    this.updateIndicatorPosition();

    if (typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver(() => {
        this.updateIndicatorPosition();
      });
      this.resizeObserver.observe(this.hostElement.nativeElement);
    }
  }

  /**
   * Lifecycle hook invoked when the component is destroyed.
   * @returns void
   */
  public ngOnDestroy(): void {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }
  }

  /**
   * Selects an option by its value if not disabled.
   * @param option The option to select
   * @returns void
   */
  public selectOption(option: SpSegmentedControlOption<T>): void {
    if (this.isControlDisabled() || option.disabled) {
      return;
    }

    if (this.value() !== option.value) {
      this.value.set(option.value);
      this.onChange(option.value);
      this.selectionChange.emit(option.value);
      this.markAsTouched();
      this.updateIndicatorPosition();
    }
  }

  /**
   * Handles keyboard navigation inside the segmented control.
   * @param event The keyboard event
   * @returns void
   */
  public onKeyDown(event: KeyboardEvent): void {
    if (this.isControlDisabled()) {
      return;
    }

    const availableOptions = this.options();
    if (!availableOptions || availableOptions.length === 0) {
      return;
    }

    const currentIndex = availableOptions.findIndex(opt => opt.value === this.value());

    let nextIndex = -1;

    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        event.preventDefault();
        nextIndex = this.findNextEnabledIndex(currentIndex, 1);
        break;

      case 'ArrowLeft':
      case 'ArrowUp':
        event.preventDefault();
        nextIndex = this.findNextEnabledIndex(currentIndex, -1);
        break;

      case 'Home':
        event.preventDefault();
        nextIndex = this.findNextEnabledIndex(-1, 1);
        break;

      case 'End':
        event.preventDefault();
        nextIndex = this.findNextEnabledIndex(availableOptions.length, -1);
        break;

      default:
        return;
    }

    if (nextIndex >= 0 && nextIndex < availableOptions.length) {
      this.selectOption(availableOptions[nextIndex]);
      const buttons = this.optionButtons();
      if (buttons[nextIndex]) {
        buttons[nextIndex].nativeElement.focus();
      }
    }
  }

  /**
   * Determines if the segmented control is disabled either via input or forms API.
   * @returns boolean Whether the control is disabled
   */
  public isControlDisabled(): boolean {
    return this.disabled() || this.isFormsDisabled();
  }

  /**
   * Recomputes and sets the sliding indicator position and size.
   * @returns void
   */
  public updateIndicatorPosition(): void {
    // Microtask delay to ensure DOM dimensions are settled
    setTimeout(() => {
      const options = this.options();
      const currentValue = this.value();
      const buttons = this.optionButtons();

      if (!options || options.length === 0 || !buttons || buttons.length === 0) {
        this.indicatorReady.set(false);
        return;
      }

      const activeIndex = options.findIndex(opt => opt.value === currentValue);

      if (activeIndex === -1 || !buttons[activeIndex]) {
        this.indicatorReady.set(false);
        return;
      }

      const activeBtn = buttons[activeIndex].nativeElement;

      this.indicatorLeft.set(activeBtn.offsetLeft);
      this.indicatorTop.set(activeBtn.offsetTop);
      this.indicatorWidth.set(activeBtn.offsetWidth);
      this.indicatorHeight.set(activeBtn.offsetHeight);
      this.indicatorReady.set(true);
    }, 0);
  }

  /**
   * Marks the component as touched.
   * @returns void
   */
  public markAsTouched(): void {
    if (!this.isTouched()) {
      this.isTouched.set(true);
      this.onTouched();
    }
  }

  /**
   * Finds the next enabled option index cycling through the options.
   * @param startIndex The starting index
   * @param step The search direction (+1 or -1)
   * @returns number The next enabled index
   */
  private findNextEnabledIndex(startIndex: number, step: number): number {
    const options = this.options();
    const count = options.length;
    let index = startIndex;

    for (let i = 0; i < count; i++) {
      index = (index + step + count) % count;
      if (!options[index].disabled) {
        return index;
      }
    }

    return startIndex;
  }

  // --------------------------------------------------------------
  // ControlValueAccessor Implementation
  // --------------------------------------------------------------

  /**
   * Writes a new value from the form model into the component.
   * @param value The new value
   * @returns void
   */
  public writeValue(value: T): void {
    this.value.set(value);
    this.updateIndicatorPosition();
  }

  /**
   * Registers a callback function to propagate changes to the form model.
   * @param fn The callback function
   * @returns void
   */
  public registerOnChange(fn: (value: T) => void): void {
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
