// --------------------------------------------------------------
// Project: SpLib
// File name: sp-accordion.component.ts
// File description: Root container for accordion panels supporting single/multi expansion and styling variants.
// Author: Alessio Giacché
// Date created: 11-11-2026
// License: MIT
// --------------------------------------------------------------

// Import
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, contentChildren, forwardRef, input } from '@angular/core';

import { SP_ACCORDION, SpAccordionContainer, SpAccordionSize, SpAccordionVariant } from './sp-accordion.types';
import { SpAccordionItemComponent } from './sp-accordion-item.component';

/**
 * SpAccordionComponent
 * Composable accordion container orchestrating panel expansion modes and visual variants.
 * @version 1.0.0
 * @since 2.0.0
 * @author Alessio Giacché
 */
@Component({
  selector: 'sp-accordion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sp-accordion.component.html',
  styleUrl: './sp-accordion.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: SP_ACCORDION,
      useExisting: forwardRef(() => SpAccordionComponent)
    }
  ]
})
export class SpAccordionComponent implements SpAccordionContainer {
  // Whether multiple panels can remain expanded simultaneously
  public multi = input<boolean>(false);

  // The visual layout variant
  public variant = input<SpAccordionVariant>('contained');

  // The sizing scale preset for paddings and typography
  public size = input<SpAccordionSize>('md');

  // Query of all projected accordion items
  public items = contentChildren<SpAccordionItemComponent>(forwardRef(() => SpAccordionItemComponent));

  /**
   * Constructor for SpAccordionComponent component
   */
  constructor() {}

  /**
   * Coordinates panel expansion when an item is toggled.
   * If multi is false, closes all other items.
   * @param toggledItem The item that was just expanded
   * @returns void
   */
  public handleItemToggle(toggledItem: SpAccordionItemComponent): void {
    if (!this.multi()) {
      const allItems = this.items();
      for (const item of allItems) {
        if (item !== toggledItem && item.expanded()) {
          item.close();
        }
      }
    }
  }

  /**
   * Collapses all accordion items.
   * @returns void
   */
  public collapseAll(): void {
    const allItems = this.items();
    for (const item of allItems) {
      if (item.expanded()) {
        item.close();
      }
    }
  }

  /**
   * Expands all accordion items (only applicable if multi is true).
   * @returns void
   */
  public expandAll(): void {
    if (!this.multi()) {
      return;
    }

    const allItems = this.items();
    for (const item of allItems) {
      if (!item.disabled() && !item.expanded()) {
        item.open();
      }
    }
  }
}
