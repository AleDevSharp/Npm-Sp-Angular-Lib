// --------------------------------------------------------------
// Project: SpLib
// File name: tabs-page.component.ts
// File description: Showcase documentation page for SpTabsComponent and SpTabComponent.
// Author: Alessio Giacché
// Date created: 11-11-2026
// License: MIT
// --------------------------------------------------------------

// Import
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { SpBtnComponent, SpTabComponent, SpTabsComponent, SpTabsSize, SpTabsVariant } from '../../../../../sp-lib/src/public-api';
import { TranslatePipe } from '../../i18n/translate.pipe';

/**
 * TabsPageComponent
 * Showcase demo and API documentation for SpTabsComponent.
 * @version 1.0.0
 * @since 2.0.0
 * @author Alessio Giacché
 */
@Component({
  selector: 'app-tabs-page',
  standalone: true,
  imports: [TranslatePipe, CommonModule, SpTabsComponent, SpTabComponent, SpBtnComponent],
  templateUrl: './tabs-page.component.html',
  styleUrl: './tabs-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabsPageComponent {
  // Active tab index for the primary interactive demo
  public readonly activeTab = signal<number>(0);

  // Active visual variant for live demo
  public readonly activeVariant = signal<SpTabsVariant>('line');

  // Active size preset
  public readonly activeSize = signal<SpTabsSize>('md');

  // Active tab index for vertical demo
  public readonly verticalTab = signal<number>(0);

  /**
   * Constructor for TabsPageComponent component
   */
  constructor() {}

  /**
   * Switches visual styling variant.
   * @param variant The variant to apply
   * @returns void
   */
  public setVariant(variant: SpTabsVariant): void {
    this.activeVariant.set(variant);
  }
}
