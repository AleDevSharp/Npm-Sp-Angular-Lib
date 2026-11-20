// --------------------------------------------------------------
// Project: SpLib
// File name: sp-modal.component.ts
// File description: Animated modal dialog component with backdrop blur and zoom transitions.
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

import { SpModalSize } from './sp-modal-drawer.types';

let modalUniqueId = 0;

/**
 * SpModalComponent
 * A modern, accessible, animated modal dialog supporting backdrop blur,
 * custom headers/footers, focus management, keyboard escape, and responsive sizing.
 *
 * @version 1.0.0
 * @since 2.0.0
 * @author Alessio Giacché
 */
@Component({
  selector: 'sp-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sp-modal.component.html',
  styleUrls: ['./sp-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpModalComponent implements OnDestroy {
  // The two-way visibility state of the modal
  public readonly visible = model<boolean>(false);

  // The title text displayed in the modal header
  public readonly title = input<string>('');

  // The size preset of the modal dialog
  public readonly size = input<SpModalSize>('md');

  // The flag indicating whether the darkened backdrop overlay is displayed
  public readonly backdrop = input<boolean>(true);

  // The flag indicating whether the backdrop applies a real-time blur effect
  public readonly backdropBlur = input<boolean>(true);

  // The flag indicating whether clicking the backdrop closes the modal
  public readonly closeOnBackdrop = input<boolean>(true);

  // The flag indicating whether pressing the Escape key closes the modal
  public readonly closeOnEscape = input<boolean>(true);

  // The flag indicating whether the close button in the header is visible
  public readonly showCloseButton = input<boolean>(true);

  // The flag indicating whether the modal dialog is vertically centered
  public readonly centered = input<boolean>(true);

  // The event emitted when the modal becomes visible
  public readonly opened = output<void>();

  // The event emitted when the modal is closed
  public readonly closed = output<void>();

  // The internal unique identifier for ARIA labeling
  public readonly id = `sp-modal-${++modalUniqueId}`;

  // The title element ID for ARIA labeling
  public readonly titleId = `${this.id}-title`;

  // The reference to the dialog container element
  @ViewChild('dialogContainer') public dialogContainer?: ElementRef<HTMLDivElement>;

  // The flag indicating whether body scrolling was locked by this modal
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
          this.focusDialog();
        }, 50);
      } else {
        this.unlockBodyScroll();
        this.closed.emit();
      }
    });
  }

  /**
   * Closes the modal programmatically.
   */
  public close(): void {
    if (this.visible()) {
      this.visible.set(false);
    }
  }

  /**
   * Handles click events on the backdrop area.
   */
  public onBackdropClick(event: MouseEvent): void {
    if (event.target === event.currentTarget && this.closeOnBackdrop()) {
      this.close();
    }
  }

  /**
   * Handles the Escape key press from document.
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
   * Sets focus to the dialog container for accessibility.
   */
  private focusDialog(): void {
    if (this.dialogContainer?.nativeElement) {
      this.dialogContainer.nativeElement.focus();
    }
  }

  /**
   * Locks the document body scrolling to prevent background scroll leaks.
   */
  private lockBodyScroll(): void {
    if (!this.isBodyLocked && this.document?.body) {
      this.renderer.setStyle(this.document.body, 'overflow', 'hidden');
      this.isBodyLocked = true;
    }
  }

  /**
   * Restores the document body scrolling.
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
