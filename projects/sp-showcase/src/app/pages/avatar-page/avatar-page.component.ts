// --------------------------------------------------------------
// Project: SpLib
// File name: avatar-page.component.ts
// File description: Showcase documentation page for SpAvatarComponent and SpAvatarGroupComponent.
// Author: Alex Morgan
// Date created: 11-11-2026
// License: MIT
// --------------------------------------------------------------

// Import
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import {
  SpAvatarComponent,
  SpAvatarGroupComponent,
  SpAvatarItem,
  SpAvatarShape,
  SpAvatarSize
} from '../../../../../sp-lib/src/public-api';
import { TranslatePipe } from '../../i18n/translate.pipe';

/**
 * AvatarPageComponent
 * Showcase demo and API documentation for SpAvatarComponent and SpAvatarGroupComponent.
 * @version 1.0.0
 * @since 2.0.0
 * @author Alex Morgan
 */
@Component({
  selector: 'app-avatar-page',
  standalone: true,
  imports: [TranslatePipe, CommonModule, SpAvatarComponent, SpAvatarGroupComponent],
  templateUrl: './avatar-page.component.html',
  styleUrl: './avatar-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AvatarPageComponent {
  // Active shape preset
  public readonly selectedShape = signal<SpAvatarShape>('circle');

  // Active size preset
  public readonly selectedSize = signal<SpAvatarSize>('md');

  // Sample team members list for avatar group stack
  public readonly teamMembers: SpAvatarItem[] = [
    { name: 'Alex Morgan', status: 'online' },
    { name: 'Emma Wilson', status: 'busy' },
    { name: 'James Taylor', status: 'away' },
    { name: 'Olivia Brown', status: 'offline' },
    { name: 'William Clark', status: 'offline' },
    { name: 'Sophia Davis' },
    { name: 'Benjamin Miller' },
    { name: 'Charlotte Moore' }
  ];

  /**
   * Constructor for AvatarPageComponent component
   */
  constructor() {}
}
