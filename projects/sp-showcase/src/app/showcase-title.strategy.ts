// --------------------------------------------------------------
// Project: SpLib
// File name: showcase-title.strategy.ts
// File description: Synchronizes page titles and search and social descriptions with showcase routes.
// Author: Alessio Giacché
// Date created: 17-11-2026
// License: MIT
// --------------------------------------------------------------

// Import
import { effect, inject, Injectable, signal } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';

import { I18nService } from './i18n/i18n.service';

/**
 * ShowcaseTitleStrategy
 * @version 1.0.0
 * @since 2.0.1
 * @author Alessio Giacché
 */
@Injectable()
export class ShowcaseTitleStrategy extends TitleStrategy {
  // The I18nService service
  private readonly i18n = inject(I18nService);

  // The last successful route state, retained when only the language changes
  private readonly _snapshot = signal<RouterStateSnapshot | null>(null);

  // The Title service
  private readonly titleService = inject(Title);

  // The Meta service
  private readonly metaService = inject(Meta);

  /**
   * Refreshes route metadata when the active route or language changes.
   */
  constructor() {
    super();
    effect(() => {
      const snapshot = this._snapshot();
      if (snapshot) this.applyMetadata(snapshot);
    });
  }

  /**
   * Updates browser, search and social metadata after a successful navigation.
   * @param snapshot The activated router state
   * @returns void
   */
  public override updateTitle(snapshot: RouterStateSnapshot): void {
    this._snapshot.set(snapshot);
    this.applyMetadata(snapshot);
  }

  /**
   * Resolves route catalog keys into localized search and social metadata.
   * @param snapshot The activated router state
   * @returns void
   */
  private applyMetadata(snapshot: RouterStateSnapshot): void {
    const titleKey = this.buildTitle(snapshot);
    if (!titleKey) return;
    const title = this.i18n.translate(titleKey);

    let page = snapshot.root;
    while (page.firstChild) page = page.firstChild;

    this.titleService.setTitle(title);
    this.metaService.updateTag({ property: 'og:title', content: title });
    this.metaService.updateTag({ name: 'twitter:title', content: title });

    const descriptionKey: string | undefined = page.data['description'];
    if (descriptionKey) {
      const description = this.i18n.translate(descriptionKey);
      this.metaService.updateTag({ name: 'description', content: description });
      this.metaService.updateTag({ property: 'og:description', content: description });
      this.metaService.updateTag({ name: 'twitter:description', content: description });
    }
  }
}
