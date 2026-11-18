// --------------------------------------------------------------
// Project: SpLib
// File name: sp-carousel.component.ts
// File description: Accessible, touch/swipe-friendly image and content carousel with progress timer.
// Author: Alessio Giacché
// Date created: 11-11-2026
// License: MIT
// --------------------------------------------------------------

import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  DestroyRef,
  ElementRef,
  HostListener,
  OnDestroy,
  QueryList,
  computed,
  effect,
  inject,
  input,
  model,
  output,
  signal,
  viewChild
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  SpCarouselArrowsPlacement,
  SpCarouselEffect,
  SpCarouselIndicatorType,
  SpCarouselItem
} from './sp-carousel.types';
import { SpCarouselSlideComponent } from './sp-carousel-slide.component';

let carouselUniqueId = 0;

/**
 * SpCarouselComponent
 * High-performance, touch/swipe-friendly image & content carousel slider.
 * Features live progress indicator bars, hardware-accelerated slide & cross-fade transitions,
 * keyboard navigation, autoplay with pause-on-hover, and WAI-ARIA carousel compliance.
 *
 * @version 1.0.0
 * @since 2.0.0
 * @author Alessio Giacché
 */
@Component({
  selector: 'sp-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sp-carousel.component.html',
  styleUrls: ['./sp-carousel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpCarouselComponent implements AfterContentInit, OnDestroy {
  // The two-way model representing the index of the currently active slide
  public readonly activeIndex = model<number>(0);

  // The array of carousel data items used for quick galleries
  public readonly items = input<SpCarouselItem[]>([]);

  // The flag indicating whether automatic slide advancement is enabled
  public readonly autoplay = input<boolean>(false);

  // The duration in milliseconds between automatic slide transitions
  public readonly interval = input<number>(5000);

  // The flag indicating whether autoplay pauses while hovering over the carousel
  public readonly pauseOnHover = input<boolean>(true);

  // The flag indicating whether the carousel loops infinitely past the start and end
  public readonly loop = input<boolean>(true);

  // The flag indicating whether slide indicator pills/dots are visible
  public readonly showIndicators = input<boolean>(true);

  // The visual display style for slide indicators
  public readonly indicatorType = input<SpCarouselIndicatorType>('bars');

  // The flag indicating whether previous and next arrow buttons are displayed
  public readonly showArrows = input<boolean>(true);

  // The position preset of navigation arrow buttons
  public readonly arrowsPlacement = input<SpCarouselArrowsPlacement>('inside');

  // The visual transition animation effect between slides
  public readonly effect = input<SpCarouselEffect>('slide');

  // The explicit CSS height string for the carousel viewport
  public readonly height = input<string>('auto');

  // The aspect ratio string applied to the carousel viewport
  public readonly aspectRatio = input<string>('');

  // The accessible label for the carousel region
  public readonly ariaLabel = input<string>('Galleria carosello');

  // The event emitted whenever the active slide index changes
  public readonly slideChange = output<number>();

  // The query list of projected child slides
  @ContentChildren(SpCarouselSlideComponent)
  public projectedSlides?: QueryList<SpCarouselSlideComponent>;

  // The reference to the track viewport element
  public readonly viewportRef = viewChild<ElementRef<HTMLDivElement>>('viewportRef');

  // The live completion percentage (0 - 100) of the current autoplay timer
  public readonly progressPercent = signal<number>(0);

  // The flag indicating whether autoplay is currently paused
  public readonly isPaused = signal<boolean>(false);

  // The unique ID for the carousel instance
  public readonly id = `sp-carousel-${++carouselUniqueId}`;

  // The signal tracking the total count of slides
  public readonly totalSlidesCount = signal<number>(0);

  // The computed total slides count
  public readonly totalCount = computed<number>(() => {
    const itemsCount = this.items().length;
    if (itemsCount > 0) {
      return itemsCount;
    }
    return this.totalSlidesCount();
  });

  // The computed array of indices for rendering indicators
  public readonly slideIndices = computed<number[]>(() => {
    return Array.from({ length: this.totalCount() }, (_, i) => i);
  });

  // Touch coordinates for swipe gestures
  private touchStartX = 0;
  private touchStartY = 0;

  // Autoplay timer handles
  private autoplayTimer: any = null;
  private progressTimer: any = null;
  private timerStartTime = 0;
  private elapsedBeforePause = 0;

  private destroyRef = inject(DestroyRef);

  constructor() {
    // Synchronize activeIndex changes
    effect(() => {
      const current = this.activeIndex();
      this.updateProjectedSlidesActiveState(current);
      this.slideChange.emit(current);
      if (this.autoplay() && !this.isPaused()) {
        this.resetProgressAndRestartTimer();
      }
    });

    // Handle autoplay toggle
    effect(() => {
      const isAuto = this.autoplay();
      if (isAuto) {
        this.startAutoplay();
      } else {
        this.stopAutoplay();
      }
    });

    this.destroyRef.onDestroy(() => {
      this.stopAutoplay();
    });
  }

  public ngAfterContentInit(): void {
    if (this.projectedSlides) {
      this.totalSlidesCount.set(this.projectedSlides.length);
      this.updateProjectedSlidesActiveState(this.activeIndex());

      this.projectedSlides.changes.subscribe((list: QueryList<SpCarouselSlideComponent>) => {
        this.totalSlidesCount.set(list.length);
        this.updateProjectedSlidesActiveState(this.activeIndex());
      });
    }
  }

  /**
   * Advances to the next slide in sequence.
   */
  public next(): void {
    const total = this.totalCount();
    if (total <= 1) return;

    const current = this.activeIndex();
    if (current < total - 1) {
      this.activeIndex.set(current + 1);
    } else if (this.loop()) {
      this.activeIndex.set(0);
    }
  }

  /**
   * Navigates back to the preceding slide.
   */
  public prev(): void {
    const total = this.totalCount();
    if (total <= 1) return;

    const current = this.activeIndex();
    if (current > 0) {
      this.activeIndex.set(current - 1);
    } else if (this.loop()) {
      this.activeIndex.set(total - 1);
    }
  }

  /**
   * Navigates directly to a target slide index.
   *
   * @param index Target 0-based slide index.
   */
  public goTo(index: number): void {
    const total = this.totalCount();
    if (index >= 0 && index < total && index !== this.activeIndex()) {
      this.activeIndex.set(index);
    }
  }

  /**
   * Resumes the autoplay progression.
   */
  public play(): void {
    this.isPaused.set(false);
    this.startAutoplay();
  }

  /**
   * Pauses autoplay progression.
   */
  public pause(): void {
    this.isPaused.set(true);
    this.stopAutoplay();
  }

  /**
   * Handles mouse enter event on the carousel to pause autoplay.
   */
  public onMouseEnter(): void {
    if (this.autoplay() && this.pauseOnHover()) {
      this.pause();
    }
  }

  /**
   * Handles mouse leave event on the carousel to resume autoplay.
   */
  public onMouseLeave(): void {
    if (this.autoplay() && this.pauseOnHover()) {
      this.play();
    }
  }

  /**
   * Handles keyboard navigation with Left and Right arrow keys.
   */
  @HostListener('keydown', ['$event'])
  public onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      this.prev();
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      this.next();
    }
  }

  /**
   * Captures initial touch coordinates for swipe detection.
   */
  public onTouchStart(event: TouchEvent): void {
    if (event.touches.length === 1) {
      this.touchStartX = event.touches[0].clientX;
      this.touchStartY = event.touches[0].clientY;
      if (this.autoplay()) {
        this.pause();
      }
    }
  }

  /**
   * Evaluates touch delta upon release to trigger horizontal swipes.
   */
  public onTouchEnd(event: TouchEvent): void {
    if (event.changedTouches.length === 1) {
      const deltaX = event.changedTouches[0].clientX - this.touchStartX;
      const deltaY = event.changedTouches[0].clientY - this.touchStartY;

      // Threshold: 40px horizontal and more horizontal than vertical
      if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX < 0) {
          this.next();
        } else {
          this.prev();
        }
      }

      if (this.autoplay() && !this.isPaused()) {
        this.play();
      }
    }
  }

  /**
   * Starts autoplay timer and progress interpolation.
   */
  private startAutoplay(): void {
    this.stopAutoplay();
    const duration = this.interval();
    if (duration <= 0 || this.totalCount() <= 1) return;

    this.timerStartTime = Date.now() - this.elapsedBeforePause;
    const progressIntervalMs = 25;

    this.progressTimer = setInterval(() => {
      const elapsed = Date.now() - this.timerStartTime;
      const pct = Math.min(100, (elapsed / duration) * 100);
      this.progressPercent.set(pct);

      if (pct >= 100) {
        this.stopAutoplay();
        this.progressPercent.set(0);
        this.elapsedBeforePause = 0;
        this.next();
      }
    }, progressIntervalMs);
  }

  /**
   * Stops active timers.
   */
  private stopAutoplay(): void {
    if (this.progressTimer) {
      clearInterval(this.progressTimer);
      this.progressTimer = null;
    }
    if (this.autoplayTimer) {
      clearTimeout(this.autoplayTimer);
      this.autoplayTimer = null;
    }
  }

  /**
   * Resets progress to 0 and begins a new interval.
   */
  private resetProgressAndRestartTimer(): void {
    this.progressPercent.set(0);
    this.elapsedBeforePause = 0;
    this.startAutoplay();
  }

  /**
   * Synchronizes active state with projected SpCarouselSlide children.
   */
  private updateProjectedSlidesActiveState(currentIndex: number): void {
    if (this.projectedSlides) {
      this.projectedSlides.forEach((slide, idx) => {
        slide.setActive(idx === currentIndex);
      });
    }
  }

  public ngOnDestroy(): void {
    this.stopAutoplay();
  }
}
