// --------------------------------------------------------------
// Project: SpLib
// File name: tooltip-page.component.ts
// File description: Showcase documentation page for SpTooltipDirective and SpTooltipComponent.
// Author: Alessio Giacché
// Date created: 11-11-2026
// License: MIT
// --------------------------------------------------------------

// Import
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { SpBtnComponent, SpTooltipDirective } from '../../../../../sp-lib/src/public-api';
import { TranslatePipe } from '../../i18n/translate.pipe';

/**
 * TooltipPageComponent
 * @version 1.0.0
 * @since 2.0.0
 * @author Alessio Giacché
 */
@Component({
  selector: 'app-tooltip-page',
  standalone: true,
  imports: [TranslatePipe, CommonModule, SpBtnComponent, SpTooltipDirective],
  templateUrl: './tooltip-page.component.html',
  styleUrl: './tooltip-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TooltipPageComponent {
  /**
   * Constructor for TooltipPageComponent component
   */
  constructor() {}
}
