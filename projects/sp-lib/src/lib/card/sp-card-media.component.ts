// --------------------------------------------------------------
// Project: SpLib
// File name: sp-card-media.component.ts
// File description: Media cover component for cards with preset aspect ratios and image handling.
// Author: Alessio Giacché
// Date created: 11-11-2026
// License: MIT
// --------------------------------------------------------------

// Import
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { SpCardMediaAspectRatio } from './sp-card.types';

/**
 * SpCardMediaComponent
 * @version 1.0.0
 * @since 2.0.0
 * @author Alessio Giacché
 */
@Component({
  selector: 'sp-card-media',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Region: Card Media Container -->
    <div
      class="sp-card-media-wrapper"
      [class.ratio-16-9]="this.aspectRatio() === '16:9'"
      [class.ratio-4-3]="this.aspectRatio() === '4:3'"
      [class.ratio-1-1]="this.aspectRatio() === '1:1'"
      [class.ratio-auto]="this.aspectRatio() === 'auto'"
      [style.height]="this.height() || null">
      @if (this.src()) {
        <img
          class="sp-card-media-img"
          [src]="this.src()"
          [alt]="this.alt()"
          loading="lazy" />
      }
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
      overflow: hidden;
    }

    .sp-card-media-wrapper {
      position: relative;
      width: 100%;
      overflow: hidden;
      background-color: var(--sp-bg-surface, #f8fafc);
      display: flex;
      align-items: center;
      justify-content: center;

      &.ratio-16-9 {
        aspect-ratio: 16 / 9;
      }

      &.ratio-4-3 {
        aspect-ratio: 4 / 3;
      }

      &.ratio-1-1 {
        aspect-ratio: 1 / 1;
      }

      &.ratio-auto {
        aspect-ratio: auto;
      }
    }

    .sp-card-media-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }

    :host-context(.is-interactive:hover) .sp-card-media-img {
      transform: scale(1.04);
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpCardMediaComponent {
  // The media image source URL
  public src = input<string>('');

  // The alternative text for the media image
  public alt = input<string>('');

  // The aspect ratio preset for the media box
  public aspectRatio = input<SpCardMediaAspectRatio>('16:9');

  // The optional explicit height override
  public height = input<string>('');

  /**
   * Constructor for SpCardMediaComponent component
   */
  constructor() {}
}
