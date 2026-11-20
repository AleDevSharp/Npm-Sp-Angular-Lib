// --------------------------------------------------------------
// Project: SpLib
// File name: sp-carousel-slide.component.ts
// File description: Slide child container component for SpCarousel.
// Author: Alessio Giacché
// Date created: 11-11-2026
// License: MIT
// --------------------------------------------------------------

import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';

let slideUniqueId = 0;

/**
 * SpCarouselSlideComponent
 * Represents an individual slide panel within an SpCarousel slider.
 * Supports custom templates, images, and content blocks.
 *
 * @version 1.0.0
 * @since 2.0.0
 * @author Alessio Giacché
 */
@Component({
  selector: 'sp-carousel-slide',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="sp-carousel-slide-inner"
      [class.sp-carousel-slide-active]="isActive()"
      role="group"
      aria-roledescription="slide"
      [attr.aria-label]="ariaLabel() || 'Diapositiva ' + slideIndex">
      <ng-content></ng-content>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        flex: 0 0 100%;
        width: 100%;
        min-width: 100%;
        box-sizing: border-box;
      }

      .sp-carousel-slide-inner {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpCarouselSlideComponent {
  // The custom accessible label for this individual slide
  public readonly ariaLabel = input<string>('');

  // The internal active state controlled by the parent carousel
  public readonly isActive = signal<boolean>(false);

  // The internal 1-based index assigned by the parent
  public slideIndex = ++slideUniqueId;

  /**
   * Sets the active state of this slide.
   *
   * @param active True if active, false otherwise.
   */
  public setActive(active: boolean): void {
    this.isActive.set(active);
  }
}
