// --------------------------------------------------------------
// Project: SpLib
// File name: sp-carousel.types.ts
// File description: Type definitions and interfaces for the SpCarousel component.
// Author: Alessio Giacché
// Date created: 11-11-2026
// License: MIT
// --------------------------------------------------------------

/**
 * SpCarouselEffect
 * Defines the transition animation between carousel slides.
 *
 * @version 1.0.0
 * @since 2.0.0
 * @author Alessio Giacché
 */
export type SpCarouselEffect = 'slide' | 'fade';

/**
 * SpCarouselIndicatorType
 * Defines the visual presentation style of navigation indicators.
 *
 * @version 1.0.0
 * @since 2.0.0
 * @author Alessio Giacché
 */
export type SpCarouselIndicatorType = 'bars' | 'dots' | 'numbers';

/**
 * SpCarouselArrowsPlacement
 * Defines the positioning of the previous/next navigation buttons.
 *
 * @version 1.0.0
 * @since 2.0.0
 * @author Alessio Giacché
 */
export type SpCarouselArrowsPlacement = 'inside' | 'outside' | 'bottom';

/**
 * SpCarouselItem
 * Generic data model for quick image or banner carousels.
 *
 * @version 1.0.0
 * @since 2.0.0
 * @author Alessio Giacché
 */
export interface SpCarouselItem {
  /** Image source URL */
  src?: string;
  /** Image alternative text */
  alt?: string;
  /** Optional caption title */
  title?: string;
  /** Optional caption description */
  description?: string;
  /** Optional CTA button text */
  ctaText?: string;
  /** Optional CTA link or identifier */
  ctaLink?: string;
}
