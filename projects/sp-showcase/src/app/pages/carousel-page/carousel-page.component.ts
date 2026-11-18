// --------------------------------------------------------------
// Project: SpLib Showcase
// File name: carousel-page.component.ts
// File description: Interactive showcase documentation page for SpCarousel.
// Author: Alessio Giacché
// Date created: 11-11-2026
// License: MIT
// --------------------------------------------------------------

import { ChangeDetectionStrategy, Component, viewChild } from '@angular/core';
import {
  SpCarouselComponent,
  SpCarouselSlideComponent,
  SpCarouselEffect,
  SpCarouselIndicatorType,
  SpCarouselItem,
  SpBtnComponent,
  SpSwitchComponent,
  SpSegmentedControlComponent,
  SpAvatarComponent
} from '../../../../../sp-lib/src/public-api';
import { TranslatePipe } from '../../i18n/translate.pipe';

/**
 * CarouselPageComponent
 * Showcase presentation of SpCarousel and SpCarouselSlide with interactive controls.
 *
 * @version 1.0.0
 * @since 2.0.0
 * @author Alessio Giacché
 */
@Component({
  selector: 'app-carousel-page',
  standalone: true,
  imports: [TranslatePipe, 
    SpCarouselComponent,
    SpCarouselSlideComponent,
    SpBtnComponent,
    SpSwitchComponent,
    SpSegmentedControlComponent,
    SpAvatarComponent
  ],
  templateUrl: './carousel-page.component.html',
  styleUrls: ['./carousel-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarouselPageComponent {
  // Primary carousel component reference
  public readonly primaryCarousel = viewChild<SpCarouselComponent>('primaryCarousel');

  // Carousel interactive settings
  public activeIndex = 0;
  public autoplay = true;
  public interval = 4000;
  public loop = true;
  public showArrows = true;
  public showIndicators = true;
  public indicatorType: SpCarouselIndicatorType = 'bars';
  public effect: SpCarouselEffect = 'slide';

  // Demo gallery image items
  public galleryItems: SpCarouselItem[] = [
    {
      src: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
      alt: 'Composizione astratta colorata',
      title: 'Galleria di immagini',
      description: 'Una slide con immagine, titolo e descrizione forniti attraverso items.'
    },
    {
      src: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
      alt: 'Scena illuminata da luci colorate',
      title: 'Navigazione tra le slide',
      description: 'Usa frecce, indicatori o comandi esterni per cambiare la slide attiva.'
    },
    {
      src: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
      alt: 'Postazione di lavoro con computer',
      title: 'Scorrimento o dissolvenza',
      description: 'Il selettore Transizione alterna lo scorrimento orizzontale e la dissolvenza della galleria.'
    }
  ];

  // Indicator type segmented options
  public indicatorOptions = [
    { label: 'Progress Bars', value: 'bars' },
    { label: 'Dots', value: 'dots' },
    { label: 'Numbers', value: 'numbers' }
  ];

  // Effect segmented options
  public effectOptions = [
    { label: 'Scorrimento', value: 'slide' },
    { label: 'Dissolvenza', value: 'fade' }
  ];

  /**
   * Triggers next slide programmatically.
   * @returns void
   */
  public onNext(): void {
    this.primaryCarousel()?.next();
  }

  /**
   * Triggers previous slide programmatically.
   * @returns void
   */
  public onPrev(): void {
    this.primaryCarousel()?.prev();
  }

  /**
   * Pauses the carousel timer.
   * @returns void
   */
  public onPause(): void {
    this.primaryCarousel()?.pause();
  }

  /**
   * Resumes the carousel timer.
   * @returns void
   */
  public onPlay(): void {
    this.autoplay = true;
    this.primaryCarousel()?.play();
  }
}
