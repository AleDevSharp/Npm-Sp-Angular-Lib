// --------------------------------------------------------------
// Project: SpLib
// File name: dividers-page.component.ts
// File description: Showcase documentation page for SpDividerComponent with orientation and label variants.
// Author: Alessio Giacché
// Date created: 18-11-2025
// License: MIT
// --------------------------------------------------------------

// Import
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { SpBtnComponent, SpDividerComponent } from '../../../../../sp-lib/src/public-api';
import { TranslatePipe } from '../../i18n/translate.pipe';

/**
 * DividersPageComponent
 * @version 2.0.0
 * @since 2.0.0
 * @author Alessio Giacché
 */
@Component({
  selector: 'app-dividers-page',
  standalone: true,
  imports: [TranslatePipe, CommonModule, SpBtnComponent, SpDividerComponent],
  templateUrl: './dividers-page.component.html',
  styleUrl: './dividers-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DividersPageComponent {
  /**
   * Constructor for DividersPageComponent component
   */
  constructor() {}
}
