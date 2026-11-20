// --------------------------------------------------------------
// Project: SpLib
// File name: segmented-control-page.component.ts
// File description: Showcase documentation page for SpSegmentedControlComponent.
// Author: Alessio Giacché
// Date created: 11-11-2026
// License: MIT
// --------------------------------------------------------------

// Import
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SpSegmentedControlComponent, SpSegmentedControlOption, SpSegmentedControlSize } from '../../../../../sp-lib/src/public-api';
import { TranslatePipe } from '../../i18n/translate.pipe';

/**
 * SegmentedControlPageComponent
 * Showcase demo and API documentation for SpSegmentedControlComponent.
 * @version 1.0.0
 * @since 2.0.0
 * @author Alessio Giacché
 */
@Component({
  selector: 'app-segmented-control-page',
  standalone: true,
  imports: [TranslatePipe, CommonModule, FormsModule, SpSegmentedControlComponent],
  templateUrl: './segmented-control-page.component.html',
  styleUrl: './segmented-control-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SegmentedControlPageComponent {
  // Selected value in standard demo
  public readonly selectedView = signal<string>('grid');

  // Selected value in size demo
  public readonly selectedPeriod = signal<string>('month');

  // Selected size preset
  public readonly activeSize = signal<SpSegmentedControlSize>('md');

  // Selected value in full-width demo
  public readonly selectedTab = signal<string>('activity');

  // View mode options
  public readonly viewOptions: SpSegmentedControlOption<string>[] = [
    {
      label: 'Griglia',
      value: 'grid',
      icon: '▦'
    },
    {
      label: 'Lista',
      value: 'list',
      icon: '☰'
    },
    {
      label: 'Kanban',
      value: 'kanban',
      icon: '▥',
      badge: '3'
    },
    {
      label: 'Archivio (Disabilitato)',
      value: 'archive',
      disabled: true
    }
  ];

  // Period options for size demos
  public readonly periodOptions: SpSegmentedControlOption<string>[] = [
    { label: 'Giorno', value: 'day' },
    { label: 'Settimana', value: 'week' },
    { label: 'Mese', value: 'month' },
    { label: 'Anno', value: 'year' }
  ];

  // Full-width tab options
  public readonly tabOptions: SpSegmentedControlOption<string>[] = [
    { label: 'Riepilogo', value: 'overview' },
    { label: 'Attività', value: 'activity', badge: '12' },
    { label: 'Impostazioni', value: 'settings' }
  ];

  /**
   * Constructor for SegmentedControlPageComponent component
   */
  constructor() {}
}
