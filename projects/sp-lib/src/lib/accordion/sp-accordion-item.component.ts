// --------------------------------------------------------------
// Project: SpLib
// File name: sp-accordion-item.component.ts
// File description: Individual collapsible panel within an accordion supporting icons, subtitles, and fluid CSS grid height motion.
// Author: Alessio Giacché
// Date created: 11-11-2026
// License: MIT
// --------------------------------------------------------------

// Import
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  input,
  model,
  Optional
} from '@angular/core';

import { SP_ACCORDION, SpAccordionContainer } from './sp-accordion.types';

let nextUniqueId = 0;

/**
 * SpAccordionItemComponent
 * Individual accordion panel with accessible WAI-ARIA controls and fluid zero-jank height transitions.
 * @version 1.0.0
 * @since 2.0.0
 * @author Alessio Giacché
 */
@Component({
  selector: 'sp-accordion-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sp-accordion-item.component.html',
  styleUrl: './sp-accordion-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpAccordionItemComponent {
  // The primary title text in the header
  public title = input<string>('');

  // Optional secondary description text beneath the title
  public subtitle = input<string>('');

  // Optional leading SVG markup or icon identifier
  public icon = input<string | undefined>(undefined);

  // Whether this panel is disabled
  public disabled = input<boolean>(false);

  // Two-way model binding indicating whether this panel is expanded
  public expanded = model<boolean>(false);

  // Unique DOM ID for the header trigger button
  public headerId = `sp-acc-header-${++nextUniqueId}`;

  // Unique DOM ID for the collapsible content region
  public contentId = `sp-acc-content-${nextUniqueId}`;

  /**
   * Constructor for SpAccordionItemComponent component
   * @param parentAccordion Optional reference to parent accordion container
   */
  constructor(@Optional() @Inject(SP_ACCORDION) private parentAccordion: SpAccordionContainer | null) {}

  /**
   * Toggles the expansion state of this panel.
   * @returns void
   */
  public toggle(): void {
    if (this.disabled()) {
      return;
    }

    const nextState = !this.expanded();
    this.expanded.set(nextState);

    if (nextState && this.parentAccordion) {
      this.parentAccordion.handleItemToggle(this);
    }
  }

  /**
   * Expands this panel.
   * @returns void
   */
  public open(): void {
    if (!this.disabled() && !this.expanded()) {
      this.expanded.set(true);
      if (this.parentAccordion) {
        this.parentAccordion.handleItemToggle(this);
      }
    }
  }

  /**
   * Collapses this panel.
   * @returns void
   */
  public close(): void {
    if (this.expanded()) {
      this.expanded.set(false);
    }
  }
}
