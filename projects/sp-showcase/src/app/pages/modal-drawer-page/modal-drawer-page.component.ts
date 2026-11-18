// --------------------------------------------------------------
// Project: SpLib Showcase
// File name: modal-drawer-page.component.ts
// File description: Interactive showcase documentation page for SpModal and SpDrawer.
// Author: Alessio Giacché
// Date created: 11-11-2026
// License: MIT
// --------------------------------------------------------------

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  SpModalComponent,
  SpDrawerComponent,
  SpModalSize,
  SpDrawerPlacement,
  SpDrawerSize,
  SpBtnComponent,
  SpSwitchComponent
} from '../../../../../sp-lib/src/public-api';
import { TranslatePipe } from '../../i18n/translate.pipe';

/**
 * ModalDrawerPageComponent
 * Showcase presentation of SpModal and SpDrawer components with interactive controls.
 *
 * @version 1.0.0
 * @since 2.0.0
 * @author Alessio Giacché
 */
@Component({
  selector: 'app-modal-drawer-page',
  standalone: true,
  imports: [TranslatePipe, 
    CommonModule,
    FormsModule,
    SpModalComponent,
    SpDrawerComponent,
    SpBtnComponent,
    SpSwitchComponent
  ],
  templateUrl: './modal-drawer-page.component.html',
  styleUrls: ['./modal-drawer-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalDrawerPageComponent {
  // Modal visibility flags
  public isStandardModalOpen = false;
  public isCustomModalOpen = false;
  public isDeleteModalOpen = false;

  // Modal configuration
  public modalSize: SpModalSize = 'md';
  public modalBackdropBlur = true;
  public modalCentered = true;

  // Drawer visibility flags
  public isDrawerOpen = false;
  public drawerPlacement: SpDrawerPlacement = 'right';
  public drawerSize: SpDrawerSize = 'md';
  public drawerBackdropBlur = true;

  // Notification logs
  public lastActionMessage = '';

  /**
   * Opens the standard modal with the given size preset.
   */
  public openModalWithSize(size: SpModalSize): void {
    this.modalSize = size;
    this.isStandardModalOpen = true;
  }

  /**
   * Opens the drawer with the given placement.
   */
  public openDrawerWithPlacement(placement: SpDrawerPlacement): void {
    this.drawerPlacement = placement;
    this.isDrawerOpen = true;
  }

  /**
   * Records an action event message for user feedback.
   */
  public recordAction(message: string): void {
    this.lastActionMessage = message;
  }
}
