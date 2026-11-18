// --------------------------------------------------------------
// Project: SpLib
// File name: switch-page.component.ts
// File description: Showcase documentation page for SpSwitchComponent toggle with interactive state.
// Author: Alessio Giacché
// Date created: 19-11-2025
// License: MIT
// --------------------------------------------------------------

// Import
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SpSwitchComponent } from '../../../../../sp-lib/src/public-api';
import { TranslatePipe } from '../../i18n/translate.pipe';

/**
 * SwitchPageComponent
 * @version 2.0.0
 * @since 2.0.0
 * @author Alessio Giacché
 */
@Component({
  selector: 'app-switch-page',
  standalone: true,
  imports: [TranslatePipe, CommonModule, FormsModule, SpSwitchComponent],
  templateUrl: './switch-page.component.html',
  styleUrl: './switch-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SwitchPageComponent {
  // Push notifications active toggle signal
  public readonly notificationsEnabled = signal<boolean>(true);

  // Auto-backup toggle signal
  public readonly autoBackup = signal<boolean>(false);

  /**
   * Constructor for SwitchPageComponent component
   */
  constructor() {}
}
