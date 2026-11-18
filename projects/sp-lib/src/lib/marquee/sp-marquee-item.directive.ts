// --------------------------------------------------------------
// Project: SpLib
// File name: sp-marquee-item.directive.ts
// File description: Structural template directive for custom marquee items and layouts.
// Author: Alessio Giacché
// Date created: 11-11-2026
// License: MIT
// --------------------------------------------------------------

// Import
import { Directive, TemplateRef, inject } from '@angular/core';

/**
 * SpMarqueeItemDirective
 * Directs template projection within SpMarqueeComponent for custom repeating content.
 *
 * @version 1.0.0
 * @since 2.0.0
 * @author Alessio Giacché
 */
@Directive({
  selector: '[spMarqueeItem]',
  standalone: true
})
export class SpMarqueeItemDirective {
  // The template reference wrapping custom marquee item content
  public readonly templateRef = inject(TemplateRef);
}
