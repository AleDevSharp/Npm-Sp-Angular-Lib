// --------------------------------------------------------------
// Project: SpLib
// File name: ripple-page.component.ts
// File description: Showcase documentation page for SpRippleDirective.
// Author: Alessio Giacché
// Date created: 11-11-2026
// License: MIT
// --------------------------------------------------------------

// Import
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, viewChild } from '@angular/core';

import { SpBtnComponent, SpRippleDirective } from '../../../../../sp-lib/src/public-api';
import { TranslatePipe } from '../../i18n/translate.pipe';

/**
 * RipplePageComponent
 * Showcase demo and API documentation for SpRippleDirective.
 * @version 1.0.0
 * @since 2.0.0
 * @author Alessio Giacché
 */
@Component({
  selector: 'app-ripple-page',
  standalone: true,
  imports: [TranslatePipe, CommonModule, SpRippleDirective, SpBtnComponent],
  templateUrl: './ripple-page.component.html',
  styleUrl: './ripple-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RipplePageComponent {
  // Reference to programmatic ripple host element
  public readonly progRipple = viewChild<SpRippleDirective>('progRipple');

  /**
   * Constructor for RipplePageComponent component
   */
  constructor() {}

  /**
   * Triggers a ripple programmatically from center.
   * @returns void
   */
  public launchProgrammatic(): void {
    const dir = this.progRipple();
    if (dir) {
      dir.launch();
    }
  }
}
