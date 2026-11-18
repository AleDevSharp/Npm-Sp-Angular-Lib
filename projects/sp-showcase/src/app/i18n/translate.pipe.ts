// --------------------------------------------------------------
// Project: SpLib
// File name: translate.pipe.ts
// File description: Reactive translation pipe scoped to showcase templates and demo captions.
// Author: Alessio Giacché
// Date created: 17-11-2026
// License: MIT
// --------------------------------------------------------------

// Import
import { inject, Pipe, PipeTransform } from '@angular/core';

import { I18nService } from './i18n.service';

/**
 * TranslatePipe
 * @version 1.0.0
 * @since 2.0.1
 * @author Alessio Giacché
 */
@Pipe({ name: 'translate', standalone: true, pure: false })
export class TranslatePipe implements PipeTransform {
  // The I18nService service
  private readonly i18n = inject(I18nService);

  /**
   * Re-evaluates language changes while retaining cached collection identities.
   * @param value The catalog key, display text or demo options
   * @returns The localized value with the original type
   */
  public transform<T>(value: T): T {
    return this.i18n.translate(value);
  }
}
