// --------------------------------------------------------------
// Project: SpLib
// File name: sp-avatar-group.component.ts
// File description: Avatar stack container supporting overlapping layout, hover spread animation, and excess count.
// Author: Alessio Giacché
// Date created: 11-11-2026
// License: MIT
// --------------------------------------------------------------

// Import
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input
} from '@angular/core';

import { SpAvatarComponent } from './sp-avatar.component';
import { SpAvatarItem, SpAvatarShape, SpAvatarSize } from './sp-avatar.types';

/**
 * SpAvatarGroupComponent
 * Overlapping avatar stack with smooth hover spread animation and excess counter.
 * @version 1.0.0
 * @since 2.0.0
 * @author Alessio Giacché
 */
@Component({
  selector: 'sp-avatar-group',
  standalone: true,
  imports: [CommonModule, SpAvatarComponent],
  templateUrl: './sp-avatar-group.component.html',
  styleUrl: './sp-avatar-group.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpAvatarGroupComponent {
  // Array of avatar items to render
  public items = input<SpAvatarItem[]>([]);

  // Maximum number of avatars visible before truncating into an excess counter
  public max = input<number>(4);

  // Size preset applied to all avatars in the group
  public size = input<SpAvatarSize>('md');

  // Shape applied to all avatars in the group
  public shape = input<SpAvatarShape>('circle');

  // Whether to animate the avatars spreading out on group hover
  public hoverSpread = input<boolean>(true);

  // Computed slice of visible avatar items
  public visibleItems = computed<SpAvatarItem[]>(() => {
    const list = this.items();
    const limit = this.max();
    return list.slice(0, limit);
  });

  // Computed excess count of avatars exceeding the max threshold
  public excessCount = computed<number>(() => {
    const total = this.items().length;
    const limit = this.max();
    return Math.max(0, total - limit);
  });

  /**
   * Constructor for SpAvatarGroupComponent component
   */
  constructor() {}
}
