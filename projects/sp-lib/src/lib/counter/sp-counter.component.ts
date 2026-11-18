// --------------------------------------------------------------
// Project: SpLib
// File name: sp-counter.component.ts
// File description: High-precision animated number counter with easing curves, currency/percentage formatting, and viewport trigger.
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
  computed,
  ElementRef,
  input,
  OnDestroy,
  output,
  signal
} from '@angular/core';

import { SpCounterEasing } from './sp-counter.types';

/**
 * SpCounterComponent
 * High-performance animated rolling counter with viewport intersection trigger and custom formatting.
 * @version 1.0.0
 * @since 2.0.0
 * @author Alessio Giacché
 */
@Component({
  selector: 'sp-counter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sp-counter.component.html',
  styleUrl: './sp-counter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpCounterComponent implements AfterViewInit, OnDestroy {
  // Initial starting value of the counter
  public from = input<number>(0);

  // Target end value of the counter
  public to = input<number>(0);

  // Total duration of the animation in milliseconds
  public duration = input<number>(2000);

  // Number of decimal places to preserve
  public decimals = input<number>(0);

  // Character used as the decimal delimiter
  public decimalSeparator = input<string>(',');

  // Character used as the thousand grouping separator
  public thousandSeparator = input<string>('.');

  // Text string or symbol prepended to the number (e.g. '€', '$', '+')
  public prefix = input<string>('');

  // Text string or symbol appended to the number (e.g. '%', 'k', ' views')
  public suffix = input<string>('');

  // Whether animation initiates automatically
  public autoplay = input<boolean>(true);

  // Whether counting starts only when element enters the visible viewport
  public viewportTrigger = input<boolean>(true);

  // Mathematical deceleration easing curve
  public easing = input<SpCounterEasing>('easeOutExpo');

  // Output event emitted when counter reaches the target value
  public counterEnd = output<number>();

  // Current interpolated number value
  public currentValue = signal<number>(0);

  // Internal state tracking whether counter is actively animating
  public isCounting = signal<boolean>(false);

  // Internal state tracking whether counter has reached completion
  public isCompleted = signal<boolean>(false);

  // Computed formatted display string
  public displayValue = computed<string>(() => {
    const val = this.currentValue();
    const dec = this.decimals();
    const decSep = this.decimalSeparator();
    const thouSep = this.thousandSeparator();

    const fixed = val.toFixed(dec);
    const [intPart, decPart] = fixed.split('.');

    // Format thousands grouping
    const formattedInt = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, thouSep);

    const formattedNumber = decPart !== undefined && dec > 0
      ? `${formattedInt}${decSep}${decPart}`
      : formattedInt;

    return `${this.prefix()}${formattedNumber}${this.suffix()}`;
  });

  // Animation frame request ID reference
  private animationFrameId: number | null = null;

  // Animation start timestamp
  private startTime: number | null = null;

  // IntersectionObserver instance tracking viewport entry
  private intersectionObserver: IntersectionObserver | null = null;

  /**
   * Constructor for SpCounterComponent component
   * @param hostElement Injected host element reference
   */
  constructor(private hostElement: ElementRef<HTMLElement>) {}

  /**
   * Lifecycle hook invoked after view initialization.
   * @returns void
   */
  public ngAfterViewInit(): void {
    this.currentValue.set(this.from());

    if (this.viewportTrigger() && typeof IntersectionObserver !== 'undefined') {
      this.intersectionObserver = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            this.start();
            if (this.intersectionObserver) {
              this.intersectionObserver.disconnect();
              this.intersectionObserver = null;
            }
            break;
          }
        }
      }, { threshold: 0.2 });

      this.intersectionObserver.observe(this.hostElement.nativeElement);
    } else if (this.autoplay()) {
      this.start();
    }
  }

  /**
   * Lifecycle hook invoked when component is destroyed.
   * @returns void
   */
  public ngOnDestroy(): void {
    this.cancelAnimation();
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
      this.intersectionObserver = null;
    }
  }

  /**
   * Starts the count animation from the beginning or current value.
   * @returns void
   */
  public start(): void {
    this.cancelAnimation();

    const startVal = this.from();
    const endVal = this.to();
    const animDuration = Math.max(100, this.duration());

    this.currentValue.set(startVal);
    this.isCounting.set(true);
    this.isCompleted.set(false);
    this.startTime = null;

    const step = (timestamp: number) => {
      if (!this.startTime) {
        this.startTime = timestamp;
      }

      const elapsed = timestamp - this.startTime;
      const progress = Math.min(1, elapsed / animDuration);
      const easedProgress = this.applyEasing(progress, this.easing());

      const nextVal = startVal + (endVal - startVal) * easedProgress;
      this.currentValue.set(nextVal);

      if (progress < 1) {
        this.animationFrameId = requestAnimationFrame(step);
      } else {
        this.currentValue.set(endVal);
        this.isCounting.set(false);
        this.isCompleted.set(true);
        this.counterEnd.emit(endVal);
      }
    };

    this.animationFrameId = requestAnimationFrame(step);
  }

  /**
   * Resets the counter back to the initial start value.
   * @returns void
   */
  public reset(): void {
    this.cancelAnimation();
    this.currentValue.set(this.from());
    this.isCounting.set(false);
    this.isCompleted.set(false);
  }

  /**
   * Cancels any active animation frame loop.
   * @returns void
   */
  private cancelAnimation(): void {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  /**
   * Applies selected easing equation to animation progress.
   * @param t Progress ratio between 0 and 1
   * @param type Easing curve type
   * @returns number The eased progress ratio
   */
  private applyEasing(t: number, type: SpCounterEasing): number {
    switch (type) {
      case 'easeOutExpo':
        return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      case 'easeOutQuad':
        return t * (2 - t);
      case 'linear':
      default:
        return t;
    }
  }
}
