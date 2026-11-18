// --------------------------------------------------------------
// Project: SpLib
// File name: accordion-page.component.ts
// File description: Showcase documentation page for SpAccordionComponent and SpAccordionItemComponent.
// Author: Alessio Giacché
// Date created: 11-11-2026
// License: MIT
// --------------------------------------------------------------

// Import
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import {
  SpAccordionComponent,
  SpAccordionItemComponent,
  SpAccordionVariant,
  SpBtnComponent
} from '../../../../../sp-lib/src/public-api';
import { TranslatePipe } from '../../i18n/translate.pipe';

/**
 * AccordionPageComponent
 * Showcase demo and API documentation for SpAccordionComponent.
 * @version 1.0.0
 * @since 2.0.0
 * @author Alessio Giacché
 */
@Component({
  selector: 'app-accordion-page',
  standalone: true,
  imports: [TranslatePipe, CommonModule, SpAccordionComponent, SpAccordionItemComponent, SpBtnComponent],
  templateUrl: './accordion-page.component.html',
  styleUrl: './accordion-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccordionPageComponent {
  // Whether multi expansion mode is active
  public readonly isMulti = signal<boolean>(false);

  // Active visual variant
  public readonly activeVariant = signal<SpAccordionVariant>('contained');

  /**
   * Constructor for AccordionPageComponent component
   */
  constructor() {}

  /**
   * Toggles multi expansion mode.
   * @returns void
   */
  public toggleMulti(): void {
    this.isMulti.update(v => !v);
  }
}
