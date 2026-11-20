// --------------------------------------------------------------
// Project: SpLib
// File name: sp-drawer.component.ts
// File description: Animated sliding off-canvas drawer panel with backdrop blur.
// Author: Alessio Giacché
// Date created: 11-11-2026
// License: MIT
// --------------------------------------------------------------

import { CommonModule, DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  ElementRef,
  HostListener,
  Inject,
  input,
  model,
  OnDestroy,
  output,
  Renderer2,
  ViewChild
} from '@angular/core';

import { SpDrawerPlacement, SpDrawerSize } from './sp-modal-drawer.types';

let drawerUniqueId = 0;

/**
 * SpDrawerComponent
 * A sleek, animated slide-out side panel (off-canvas drawer) supporting
 * directional placement (left, right, top, bottom), backdrop blur, body scroll lock,
 * and keyboard navigation.
 *
 * @version 1.0.0
 * @since 2.0.0
 * @author Alessio Giacché
 */
@Component({
  selector: 'sp-drawer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sp-drawer.component.html',
  styleUrls: ['./sp-drawer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpDrawerComponent implements OnDestroy {
  // The two-way visibility state of the drawer
  public readonly visible = model<boolean>(false);

  // The title text displayed in the drawer header
  public readonly title = input<string>('');

  // The placement edge from which the drawer slides in
  public readonly placement = input<SpDrawerPlacement>('right');

  // The dimension preset of the drawer panel
  public readonly size = input<SpDrawerSize>('md');

  // The flag indicating whether the backdrop overlay is shown
  public readonly backdrop = input<boolean>(true);

  // The flag indicating whether real-time blur is applied to the backdrop
  public readonly backdropBlur = input<boolean>(true);

  // The flag indicating whether clicking the backdrop dismisses the drawer
  public readonly closeOnBackdrop = input<boolean>(true);

  // The flag indicating whether pressing the Escape key closes the drawer
  public readonly closeOnEscape = input<boolean>(true);

  // The flag indicating whether the close button is displayed
  public readonly showCloseButton = input<boolean>(true);

  // The event emitted when the drawer opens
  public readonly opened = output<void>();

  // The event emitted when the drawer closes
  public readonly closed = output<void>();

  // The unique identifier for ARIA labeling
  public readonly id = `sp-drawer-${++drawerUniqueId}`;

  // The title element ID for ARIA labeling
  public readonly titleId = `${this.id}-title`;

  // The reference to the drawer panel element
  @ViewChild('panelContainer') public panelContainer?: ElementRef<HTMLDivElement>;

  // The flag tracking whether body scrolling was locked
  private isBodyLocked = false;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2
  ) {
    effect(() => {
      const isVisible = this.visible();
      if (isVisible) {
        this.lockBodyScroll();
        this.opened.emit();
        setTimeout(() => {
          this.focusPanel();
        }, 50);
      } else {
        this.unlockBodyScroll();
        this.closed.emit();
      }
    });
  }

  /**
   * Closes the drawer programmatically.
   */
  public close(): void {
    if (this.visible()) {
      this.visible.set(false);
    }
  }

  /**
   * Handles click events on the backdrop overlay.
   */
  public onBackdropClick(event: MouseEvent): void {
    if (event.target === event.currentTarget && this.closeOnBackdrop()) {
      this.close();
    }
  }

  /**
   * Handles Escape key press to dismiss drawer.
   * @param event The keyboard event
   * @returns void
   */
  @HostListener('document:keydown.escape', ['$event'])
  public onEscapeKey(event: Event): void {
    if (this.visible() && this.closeOnEscape()) {
      event.preventDefault();
      this.close();
    }
  }

  /**
   * Focuses the panel for accessibility.
   */
  private focusPanel(): void {
    if (this.panelContainer?.nativeElement) {
      this.panelContainer.nativeElement.focus();
    }
  }

  /**
   * Locks the document body scrolling.
   */
  private lockBodyScroll(): void {
    if (!this.isBodyLocked && this.document?.body) {
      this.renderer.setStyle(this.document.body, 'overflow', 'hidden');
      this.isBodyLocked = true;
    }
  }

  /**
   * Restores document body scrolling.
   */
  private unlockBodyScroll(): void {
    if (this.isBodyLocked && this.document?.body) {
      this.renderer.removeStyle(this.document.body, 'overflow');
      this.isBodyLocked = false;
    }
  }

  public ngOnDestroy(): void {
    this.unlockBodyScroll();
  }
}
