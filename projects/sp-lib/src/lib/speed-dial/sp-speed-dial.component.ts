// --------------------------------------------------------------
// Project: SpLib
// File name: sp-speed-dial.component.ts
// File description: Standalone Floating Action Button & Speed Dial component with staggered spring animations and backdrop support.
// Author: Alessio Giacché
// Date created: 11-11-2026
// License: MIT
// --------------------------------------------------------------

// Import
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  ViewEncapsulation,
  computed,
  inject,
  input,
  model,
  output
} from '@angular/core';

import { SpRippleDirective } from '../ripple/sp-ripple.directive';
import {
  SpSpeedDialColor,
  SpSpeedDialDirection,
  SpSpeedDialItem,
  SpSpeedDialSize,
  SpSpeedDialTrigger,
  SpSpeedDialType
} from './sp-speed-dial.types';

/**
 * SpSpeedDialComponent
 * Circular Floating Action Button (FAB) that expands into a staggered sub-menu of quick actions.
 *
 * @version 1.0.0
 * @since 2.0.0
 * @author Alessio Giacché
 */
@Component({
  selector: 'sp-speed-dial',
  standalone: true,
  imports: [SpRippleDirective],
  templateUrl: './sp-speed-dial.component.html',
  styleUrl: './sp-speed-dial.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  exportAs: 'spSpeedDial'
})
export class SpSpeedDialComponent implements OnDestroy {
  // ================================
  // Region: Services & References
  // ================================

  // The element reference of the host component
  private readonly elementRef = inject(ElementRef);

  // The pending delayed close used to cross gaps in hover mode
  private hoverCloseTimeout: ReturnType<typeof setTimeout> | null = null;

  // ================================
  // Region: Inputs & Models
  // ================================

  // The array of quick action items to display in the speed dial menu
  public readonly items = input<SpSpeedDialItem[]>([]);

  // The expansion direction for linear layouts (up, down, left, right)
  public readonly direction = input<SpSpeedDialDirection>('up');

  // The geometry layout mode (linear list, semi-circle, quarter-circle)
  public readonly type = input<SpSpeedDialType>('linear');

  // The user interaction trigger that opens the speed dial (click or hover)
  public readonly trigger = input<SpSpeedDialTrigger>('click');

  // The size variant for the primary FAB and action buttons (sm, md, lg)
  public readonly size = input<SpSpeedDialSize>('md');

  // The semantic color variant for the primary floating action button
  public readonly color = input<SpSpeedDialColor>('primary');

  // The two-way model signal representing the open/expanded state
  public readonly opened = model<boolean>(false);

  // The toggle indicating whether the main icon rotates 45 degrees upon opening
  public readonly rotateAnimation = input<boolean>(true);

  // The optional custom icon for the primary FAB (text, SVG string, or glyph)
  public readonly icon = input<string>('');

  // The optional alternate icon shown when the speed dial is open
  public readonly activeIcon = input<string>('');

  // The flag indicating whether a backdrop overlay should dim and blur the background
  public readonly backdrop = input<boolean>(false);

  // The flag indicating whether clicking the backdrop closes the speed dial
  public readonly backdropDismiss = input<boolean>(true);

  // The flag indicating whether selecting an action item automatically closes the speed dial
  public readonly closeOnItemClick = input<boolean>(true);

  // The disabled status of the speed dial preventing any user interaction
  public readonly disabled = input<boolean>(false);

  // The accessible aria-label description for the primary floating button
  public readonly ariaLabel = input<string>('Quick actions speed dial');

  // The radius in pixels used for radial fan-out layouts (semi-circle, quarter-circle)
  public readonly radius = input<number>(85);

  // The toggle to display action text label pills beside the circular action buttons
  public readonly showLabels = input<boolean>(true);

  // ================================
  // Region: Outputs
  // ================================

  // The event emitted when an action item is clicked by the user
  public readonly itemClick = output<SpSpeedDialItem>();

  // The event emitted whenever the speed dial opens
  public readonly onOpen = output<void>();

  // The event emitted whenever the speed dial closes
  public readonly onClose = output<void>();

  // ================================
  // Region: Computed Signals
  // ================================

  // The computed check verifying whether radial layout mode is active
  public readonly isRadial = computed(() => this.type() !== 'linear');

  // ================================
  // Region: Host Listeners
  // ================================

  /**
   * Closes the speed dial when the Escape key is pressed.
   * @param event The keyboard event
   * @returns void
   */
  @HostListener('document:keydown.escape', ['$event'])
  public handleEscape(event: KeyboardEvent): void {
    if (this.opened() && !this.disabled()) {
      event.preventDefault();
      this.close();
    }
  }

  /**
   * Closes the speed dial when clicking outside the component boundary.
   * @param event The mouse click event
   * @returns void
   */
  @HostListener('document:click', ['$event'])
  public handleDocumentClick(event: MouseEvent): void {
    if (!this.opened() || this.disabled()) {
      return;
    }

    const clickedInside = this.elementRef.nativeElement.contains(event.target as Node);
    if (!clickedInside) {
      this.close();
    }
  }

  /**
   * Handles mouse enter events when hover trigger mode is enabled.
   * @returns void
   */
  @HostListener('mouseenter')
  public handleMouseEnter(): void {
    this.cancelHoverClose();
    if (this.trigger() === 'hover' && !this.disabled() && !this.opened()) {
      this.open();
    }
  }

  /**
   * Handles mouse leave events when hover trigger mode is enabled.
   * @returns void
   */
  @HostListener('mouseleave')
  public handleMouseLeave(): void {
    if (this.trigger() === 'hover' && !this.disabled() && this.opened()) {
      this.cancelHoverClose();
      this.hoverCloseTimeout = setTimeout(() => this.close(), 200);
    }
  }

  // ================================
  // Region: Public API & Actions
  // ================================

  /**
   * Toggles the open/closed state of the speed dial.
   * @returns void
   */
  public toggle(): void {
    if (this.disabled()) {
      return;
    }

    if (this.opened()) {
      this.close();
    } else {
      this.open();
    }
  }

  /**
   * Opens and expands the speed dial action buttons.
   * @returns void
   */
  public open(): void {
    if (this.disabled() || this.opened()) {
      return;
    }

    this.opened.set(true);
    this.onOpen.emit();
  }

  /**
   * Collapses and closes the speed dial action buttons.
   * @returns void
   */
  public close(): void {
    this.cancelHoverClose();
    if (!this.opened()) {
      return;
    }

    this.opened.set(false);
    this.onClose.emit();
  }

  /**
   * Handles clicking the primary floating action button.
   * @param event The mouse click event
   * @returns void
   */
  public onTriggerClick(event: MouseEvent): void {
    event.stopPropagation();
    if (this.trigger() === 'click' || event.detail === 0) {
      this.toggle();
    }
  }

  /**
   * Handles clicking an individual action item button or its label.
   * @param item The selected speed dial action item
   * @param event The mouse click event
   * @returns void
   */
  public onItemSelect(item: SpSpeedDialItem, event: MouseEvent): void {
    event.stopPropagation();

    if (this.disabled() || item.disabled || !this.opened()) {
      return;
    }

    if (item.command) {
      item.command(item);
    }

    this.itemClick.emit(item);

    if (this.closeOnItemClick()) {
      this.close();
    }
  }

  /**
   * Handles clicking the backdrop overlay.
   * @param event The mouse click event
   * @returns void
   */
  public onBackdropClick(event: MouseEvent): void {
    event.stopPropagation();
    if (this.backdropDismiss()) {
      this.close();
    }
  }

  /**
   * Calculates dynamic positioning, transition delays, and radial offsets for action items.
   * @param index The zero-based index of the action item
   * @param total The total count of action items
   * @returns An object containing CSS custom properties
   */
  public getItemStyle(index: number, total: number): { [key: string]: string | number } {
    const layout = this.type();
    const isOpened = this.opened();

    // Stagger delay: forward when opening, reverse when closing
    const delay = isOpened ? index * 40 : (total - 1 - index) * 25;

    if (layout === 'linear') {
      const triggerSize = { sm: 44, md: 56, lg: 66 }[this.size()];
      const actionSize = { sm: 36, md: 44, lg: 52 }[this.size()];
      const distance = (triggerSize + actionSize) / 2 + 14 + index * (actionSize + 12);
      const offsets = { up: [0, -distance], down: [0, distance], left: [-distance, 0], right: [distance, 0] };
      const [x, y] = offsets[this.direction()];
      return { '--item-index': index, '--item-delay': delay + 'ms', '--item-tx': x + 'px', '--item-ty': y + 'px' };
    }

    const rad = Math.max(0, this.radius());
    const span = layout === 'semi-circle' ? 180 : 90;
    const baseAngle = this.getBaseAngleForDirection(this.direction());
    const angle = total > 1 ? baseAngle - span / 2 + index * span / (total - 1) : baseAngle;

    const radAngle = (angle * Math.PI) / 180;
    const tx = Math.round(rad * Math.cos(radAngle));
    const ty = Math.round(rad * Math.sin(radAngle));

    return {
      '--item-index': index,
      '--item-delay': `${delay}ms`,
      '--item-tx': `${tx}px`,
      '--item-ty': `${ty}px`
    };
  }

  // ================================
  // Region: Private Helpers
  // ================================

  /**
   * Cancels a pending hover-close operation.
   * @returns void
   */
  private cancelHoverClose(): void {
    if (this.hoverCloseTimeout !== null) {
      clearTimeout(this.hoverCloseTimeout);
      this.hoverCloseTimeout = null;
    }
  }

  /**
   * Releases the pending hover-close timer.
   * @returns void
   */
  public ngOnDestroy(): void {
    this.cancelHoverClose();
  }

  /**
   * Resolves the center reference angle for radial fan layouts based on direction.
   * @param dir The configured expansion direction
   * @returns The base angle in degrees
   */
  private getBaseAngleForDirection(dir: SpSpeedDialDirection): number {
    switch (dir) {
      case 'up':
        return 270;
      case 'down':
        return 90;
      case 'left':
        return 180;
      case 'right':
      default:
        return 0;
    }
  }
}
