// --------------------------------------------------------------
// Project: SpLib
// File name: speed-dial-page.component.ts
// File description: Showcase documentation page for SpSpeedDialComponent.
// Author: Alessio Giacché
// Date created: 11-11-2026
// License: MIT
// --------------------------------------------------------------

// Import
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import {
  SpCardComponent,
  SpCardContentComponent,
  SpCardHeaderComponent,
  SpSpeedDialColor,
  SpSpeedDialComponent,
  SpSpeedDialDirection,
  SpSpeedDialItem,
  SpSpeedDialSize,
  SpSpeedDialTrigger,
  SpSpeedDialType,
  SpSwitchComponent
} from '../../../../../sp-lib/src/public-api';
import { TranslatePipe } from '../../i18n/translate.pipe';

/**
 * SpeedDialPageComponent
 * Showcase demo and API documentation for SpSpeedDialComponent.
 *
 * @version 1.0.0
 * @since 2.0.0
 * @author Alessio Giacché
 */
@Component({
  selector: 'app-speed-dial-page',
  standalone: true,
  imports: [
    TranslatePipe,
    CommonModule,
    SpSpeedDialComponent,
    SpCardComponent,
    SpCardHeaderComponent,
    SpCardContentComponent,
    SpSwitchComponent
  ],
  templateUrl: './speed-dial-page.component.html',
  styleUrl: './speed-dial-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpeedDialPageComponent {
  // The selected direction for the interactive speed dial
  public readonly direction = signal<SpSpeedDialDirection>('up');

  // The selected geometry layout type (linear, semi-circle, quarter-circle)
  public readonly type = signal<SpSpeedDialType>('linear');

  // The selected trigger mode (click or hover)
  public readonly trigger = signal<SpSpeedDialTrigger>('click');

  // The selected size preset for the speed dial
  public readonly size = signal<SpSpeedDialSize>('md');

  // The selected semantic color theme
  public readonly color = signal<SpSpeedDialColor>('primary');

  // The toggle indicating whether the backdrop blur is active
  public readonly backdrop = signal<boolean>(false);

  // The toggle indicating whether action text labels are shown
  public readonly showLabels = signal<boolean>(true);

  // The signal holding the message of the last clicked action item
  public readonly lastAction = signal<string>('Nessuna azione eseguita');

  // The list of quick action items for the playground demo
  public readonly actions: SpSpeedDialItem[] = [
    {
      id: 'copy',
      label: 'Copia Link',
      icon: '📋',
      color: 'neutral'
    },
    {
      id: 'share',
      label: 'Condividi',
      icon: '🚀',
      color: 'info'
    },
    {
      id: 'favorite',
      label: 'Aggiungi ai Preferiti',
      icon: '⭐',
      color: 'warning'
    },
    {
      id: 'download',
      label: 'Esporta PDF',
      icon: '📥',
      color: 'success'
    }
  ];

  // Radial fan-out demo items with colorful icons
  public readonly radialActions: SpSpeedDialItem[] = [
    { id: 'camera', label: 'Fotocamera', icon: '📷', color: 'primary' },
    { id: 'gallery', label: 'Galleria', icon: '🖼️', color: 'info' },
    { id: 'document', label: 'Documento', icon: '📄', color: 'success' },
    { id: 'location', label: 'Posizione', icon: '📍', color: 'danger' }
  ];

  /**
   * Updates the selected expansion direction.
   * @param dir The new direction
   * @returns void
   */
  public setDirection(dir: SpSpeedDialDirection): void {
    this.direction.set(dir);
  }

  /**
   * Updates the selected layout geometry type.
   * @param val The new layout type
   * @returns void
   */
  public setType(val: SpSpeedDialType): void {
    this.type.set(val);
  }

  /**
   * Updates the trigger activation mode.
   * @param mode The new trigger mode
   * @returns void
   */
  public setTrigger(mode: SpSpeedDialTrigger): void {
    this.trigger.set(mode);
  }

  /**
   * Updates the size variant of the speed dial.
   * @param s The new size
   * @returns void
   */
  public setSize(s: SpSpeedDialSize): void {
    this.size.set(s);
  }

  /**
   * Updates the color theme of the primary FAB.
   * @param c The new color
   * @returns void
   */
  public setColor(c: SpSpeedDialColor): void {
    this.color.set(c);
  }

  /**
   * Logs and records an executed action for display in the showcase toast.
   * @param msg The message describing the action
   * @returns void
   */
  public recordAction(msg: string): void {
    this.lastAction.set(msg);
  }
}
