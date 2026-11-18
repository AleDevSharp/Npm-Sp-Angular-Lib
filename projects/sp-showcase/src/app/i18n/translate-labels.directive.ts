// --------------------------------------------------------------
// Project: SpLib
// File name: translate-labels.directive.ts
// File description: Localizes fixed library accessibility captions within the showcase shell only.
// Author: Alessio Giacché
// Date created: 17-11-2026
// License: MIT
// --------------------------------------------------------------

// Import
import { DestroyRef, Directive, effect, ElementRef, inject, Renderer2 } from '@angular/core';

import { I18nService } from './i18n.service';

/**
 * TranslateLabelsDirective
 * @version 1.0.0
 * @since 2.0.1
 * @author Alessio Giacché
 */
@Directive({ selector: '[showcaseI18nLabels]', standalone: true })
export class TranslateLabelsDirective {
  // The showcase shell element, excluding code samples and other applications
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef);

  // The I18nService service
  private readonly i18n = inject(I18nService);

  // The Renderer2 service
  private readonly renderer = inject(Renderer2);

  // The DestroyRef service
  private readonly destroyRef = inject(DestroyRef);

  /**
   * Watches captions created by library controls without changing their implementation.
   */
  constructor() {
    effect(() => {
      this.i18n.language();
      this.localizeLabels();
    });

    if (typeof MutationObserver === 'undefined') return;
    const observer = new MutationObserver(() => this.localizeLabels());
    observer.observe(this.element.nativeElement, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['aria-label', 'aria-roledescription']
    });
    this.destroyRef.onDestroy(() => observer.disconnect());
  }

  /**
   * Translates accessible labels on rendered controls, including newly opened dialogs.
   * @returns void
   */
  private localizeLabels(): void {
    for (const element of Array.from(this.element.nativeElement.querySelectorAll('[aria-label], [aria-roledescription]'))) {
      if (element.closest('pre, code')) continue;
      for (const attribute of ['aria-label', 'aria-roledescription']) {
        const original = element.getAttribute(attribute);
        if (!original) continue;
        const translated = this.i18n.translate(original);
        if (original !== translated) this.renderer.setAttribute(element, attribute, translated);
      }
    }
  }
}
