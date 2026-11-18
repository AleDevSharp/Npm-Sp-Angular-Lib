// --------------------------------------------------------------
// Project: SpLib
// File name: sp-tab.component.ts
// File description: Individual tab panel item containing header metadata and projected content.
// Author: Alessio Giacché
// Date created: 11-11-2026
// License: MIT
// --------------------------------------------------------------

// Import
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  signal
} from '@angular/core';

let nextTabId = 0;

/**
 * SpTabComponent
 * Individual tab pane providing header label, optional icon, badge, and content projection.
 * @version 1.0.0
 * @since 2.0.0
 * @author Alessio Giacché
 */
@Component({
  selector: 'sp-tab',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sp-tab.component.html',
  styleUrl: './sp-tab.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpTabComponent {
  // The display label text in the tab header
  public label = input<string>('');

  // Optional leading SVG markup or icon identifier
  public icon = input<string | undefined>(undefined);

  // Optional badge text or counter displayed alongside the tab label
  public badge = input<string | number | undefined>(undefined);

  // Whether this specific tab is disabled
  public disabled = input<boolean>(false);

  // Internal state tracking whether this tab is currently the active selected tab
  public active = signal<boolean>(false);

  // Unique DOM ID for the tab header trigger
  public headerId = `sp-tab-header-${++nextTabId}`;

  // Unique DOM ID for the tab panel body
  public panelId = `sp-tab-panel-${nextTabId}`;

  /**
   * Constructor for SpTabComponent component
   */
  constructor() {}
}
