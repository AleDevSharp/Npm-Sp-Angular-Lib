// --------------------------------------------------------------
// Project: SpLib
// File name: sp-marquee.component.ts
// File description: Modern infinite scrolling marquee component for partner logos, tickers, and content streams.
// Author: Alessio Giacché
// Date created: 11-11-2026
// License: MIT
// --------------------------------------------------------------

// Import
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  TemplateRef,
  ViewEncapsulation,
  computed,
  contentChild,
  input,
  signal
} from '@angular/core';

import { SpMarqueeItemDirective } from './sp-marquee-item.directive';
import { SpMarqueeDirection } from './sp-marquee.types';

/**
 * SpMarqueeComponent
 * Infinite seamless scrolling track with hardware-accelerated animations, edge fade, and pause controls.
 *
 * @version 1.0.0
 * @since 2.0.0
 * @author Alessio Giacché
 */
@Component({
  selector: 'sp-marquee',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sp-marquee.component.html',
  styleUrl: './sp-marquee.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  exportAs: 'spMarquee'
})
export class SpMarqueeComponent {
  // ================================
  // Region: Content Queries
  // ================================

  // The custom template queried from SpMarqueeItemDirective if declared
  private readonly directiveTemplate = contentChild(SpMarqueeItemDirective);

  // The raw template ref queried directly from component body
  private readonly rawTemplate = contentChild(TemplateRef);

  // ================================
  // Region: Inputs & State
  // ================================

  // The optional data-driven array of items to iterate and scroll
  public readonly items = input<any[]>([]);

  // The motion direction for the infinite marquee scroll (left, right, up, down)
  public readonly direction = input<SpMarqueeDirection>('left');

  // The scroll speed in seconds for one complete cycle
  public readonly speed = input<number>(25);

  // The explicit CSS duration override (e.g. '30s', '15s')
  public readonly duration = input<string>('');

  // The gap spacing between elements (CSS string, e.g. '2rem', '32px')
  public readonly gap = input<string>('2rem');

  // The toggle indicating whether the marquee should pause when hovered
  public readonly pauseOnHover = input<boolean>(true);

  // The toggle indicating whether clicking the track toggles pause state
  public readonly pauseOnClick = input<boolean>(false);

  // The toggle enabling subtle transparency gradient masks on the boundary edges
  public readonly fade = input<boolean>(true);

  // The width of the edge gradient fade (CSS length, e.g. '64px', '10%')
  public readonly fadeWidth = input<string>('64px');

  // The number of track duplicates rendered for seamless looping (minimum 2)
  public readonly repeat = input<number>(2);

  // The toggle indicating whether direction is inverted
  public readonly reverse = input<boolean>(false);

  // The accessible aria-label description for the marquee region
  public readonly ariaLabel = input<string>('Marquee content scroller');

  // The reactive signal tracking manual play/pause status
  public readonly isPaused = signal<boolean>(false);

  // ================================
  // Region: Computed Signals
  // ================================

  // The pointer presence used for temporary hover pausing
  private readonly isHovered = signal(false);

  // The effective pause state combining manual and temporary hover pausing
  public readonly isEffectivelyPaused = computed(() => this.isPaused() || (this.pauseOnHover() && this.isHovered()));

  // The active template reference resolved from directive or child template
  public readonly itemTemplate = computed<TemplateRef<any> | null>(() => {
    const dir = this.directiveTemplate();
    if (dir?.templateRef) {
      return dir.templateRef;
    }
    return this.rawTemplate() || null;
  });

  // The effective scrolling direction taking the reverse flag into account
  public readonly effectiveDirection = computed<SpMarqueeDirection>(() => {
    const dir = this.direction();
    const isRev = this.reverse();

    if (!isRev) {
      return dir;
    }

    switch (dir) {
      case 'left':
        return 'right';
      case 'right':
        return 'left';
      case 'up':
        return 'down';
      case 'down':
        return 'up';
      default:
        return 'left';
    }
  });

  // The array of track indices repeated for seamless infinite motion
  public readonly trackIndices = computed<number[]>(() => {
    const count = Math.max(2, this.repeat());
    return Array.from({ length: count }, (_, i) => i);
  });

  // The CSS custom property style bindings injected into the wrapper
  public readonly containerStyles = computed<{ [key: string]: string }>(() => {
    const dur = this.duration() ? this.duration() : `${this.speed()}s`;
    return {
      '--sp-marquee-duration': dur,
      '--sp-marquee-gap': this.gap(),
      '--sp-marquee-fade-width': this.fadeWidth()
    };
  });

  // ================================
  // Region: Public API & Actions
  // ================================

  /**
   * Tracks pointer entry without changing the manual pause state.
   * @returns void
   */
  public onMouseEnter(): void {
    this.isHovered.set(true);
  }

  /**
   * Clears temporary hover pausing while preserving manual pause state.
   * @returns void
   */
  public onMouseLeave(): void {
    this.isHovered.set(false);
  }

  /**
   * Pauses the continuous marquee scroll animation.
   * @returns void
   */
  public pause(): void {
    this.isPaused.set(true);
  }

  /**
   * Resumes the continuous marquee scroll animation.
   * @returns void
   */
  public play(): void {
    this.isPaused.set(false);
  }

  /**
   * Toggles the play/pause state of the marquee animation.
   * @returns void
   */
  public togglePause(): void {
    this.isPaused.update((prev) => !prev);
  }

  /**
   * Handles click events on the marquee container.
   * @returns void
   */
  public onContainerClick(): void {
    if (this.pauseOnClick()) {
      this.togglePause();
    }
  }
}
