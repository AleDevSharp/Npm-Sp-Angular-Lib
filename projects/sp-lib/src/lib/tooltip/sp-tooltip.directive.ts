// --------------------------------------------------------------
// Project: SpLib
// File name: sp-tooltip.directive.ts
// File description: Interactive directive attaching a dynamic, floating tooltip to any host element.
// Author: Alessio Giacché
// Date created: 11-11-2026
// License: MIT
// --------------------------------------------------------------

// Import
import {
  ApplicationRef,
  ComponentRef,
  createComponent,
  Directive,
  ElementRef,
  EnvironmentInjector,
  HostListener,
  inject,
  input,
  OnDestroy,
  TemplateRef
} from '@angular/core';

import { SpTooltipComponent } from './sp-tooltip.component';
import { SpTooltipPosition, SpTooltipTheme } from './sp-tooltip.types';

/**
 * SpTooltipDirective
 * @version 1.0.0
 * @since 2.0.0
 * @author Alessio Giacché
 */
@Directive({
  selector: '[spTooltip]',
  standalone: true
})
export class SpTooltipDirective implements OnDestroy {
  // The host element reference
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  // The application reference for managing view attachments
  private readonly appRef = inject(ApplicationRef);

  // The environment injector
  private readonly injector = inject(EnvironmentInjector);

  // The tooltip content: string or TemplateRef
  public spTooltip = input<string | TemplateRef<unknown>>('');

  // The visual position of the tooltip relative to host
  public spTooltipPosition = input<SpTooltipPosition>('top');

  // The color theme for the tooltip
  public spTooltipTheme = input<SpTooltipTheme>('dark');

  // Delay before showing tooltip in milliseconds
  public spTooltipDelay = input<number>(120);

  // Whether tooltip display is disabled
  public spTooltipDisabled = input<boolean>(false);

  // Whether to show the directional arrow
  public spTooltipArrow = input<boolean>(true);

  // Optional keyboard shortcut badge
  public spTooltipShortcut = input<string>('');

  // Active component reference for the tooltip instance
  private tooltipRef: ComponentRef<SpTooltipComponent> | null = null;

  // Timer ID for delayed appearance
  private showTimeoutId: ReturnType<typeof setTimeout> | null = null;

  // The observer tracking host and content size changes while the tooltip is open
  private resizeObserver: ResizeObserver | null = null;

  // Scroll listener callback
  private scrollListener: (() => void) | null = null;

  /**
   * Constructor for SpTooltipDirective directive
   */
  constructor() {}

  /**
   * Handles mouse enter event on host.
   * @returns void
   */
  @HostListener('mouseenter')
  public onMouseEnter(): void {
    this.scheduleShow();
  }

  /**
   * Handles mouse leave event on host.
   * @returns void
   */
  @HostListener('mouseleave')
  public onMouseLeave(): void {
    this.hide();
  }

  /**
   * Handles focus in event on host for keyboard accessibility.
   * @returns void
   */
  @HostListener('focusin')
  public onFocusIn(): void {
    this.scheduleShow();
  }

  /**
   * Handles focus out event on host.
   * @returns void
   */
  @HostListener('focusout')
  public onFocusOut(): void {
    this.hide();
  }

  /**
   * Handles Escape key press to dismiss tooltip.
   * @returns void
   */
  @HostListener('keydown.escape')
  public onEscape(): void {
    this.hide();
  }

  /**
   * Schedules showing the tooltip with the configured delay.
   * @returns void
   */
  private scheduleShow(): void {
    if (this.spTooltipDisabled() || !this.spTooltip()) {
      return;
    }
    this.clearTimeout();
    this.showTimeoutId = setTimeout(() => {
      this.show();
    }, this.spTooltipDelay());
  }

  /**
   * Instantiates and displays the tooltip overlay.
   * @returns void
   */
  private show(): void {
    if (this.tooltipRef || this.spTooltipDisabled() || !this.spTooltip()) {
      return;
    }

    // Create the tooltip component dynamically
    this.tooltipRef = createComponent(SpTooltipComponent, {
      environmentInjector: this.injector
    });

    const instance = this.tooltipRef.instance;
    const content = this.spTooltip();

    if (content instanceof TemplateRef) {
      instance.template.set(content);
    } else {
      instance.text.set(content);
    }

    instance.theme.set(this.spTooltipTheme());
    instance.showArrow.set(this.spTooltipArrow());
    instance.shortcut.set(this.spTooltipShortcut());

    // Attach to DOM body
    document.body.appendChild(this.tooltipRef.location.nativeElement);
    this.appRef.attachView(this.tooltipRef.hostView);

    // Render the text or template before measuring the panel layout.
    this.tooltipRef.changeDetectorRef.detectChanges();
    this.updatePosition();

    // Trigger visible animation
    instance.visible.set(true);
    this.tooltipRef.changeDetectorRef.detectChanges();

    // Listen for window scroll to update or dismiss
    this.scrollListener = () => this.updatePosition();
    window.addEventListener('scroll', this.scrollListener, true);
    window.addEventListener('resize', this.scrollListener);

    // Keep the anchor aligned when fonts or rich content change layout dimensions.
    if (typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver(() => this.updatePosition());
      this.resizeObserver.observe(this.elementRef.nativeElement);
      const panel = this.tooltipRef.location.nativeElement.firstElementChild as HTMLElement | null;
      if (panel) {
        this.resizeObserver.observe(panel);
      }
    }
  }

  /**
   * Calculates coordinates and handles auto-flip collision detection.
   * @returns void
   */
  private updatePosition(): void {
    if (!this.tooltipRef) {
      return;
    }

    const hostEl = this.elementRef.nativeElement;
    const tooltipEl = this.tooltipRef.location.nativeElement.firstElementChild as HTMLElement;
    if (!tooltipEl) {
      return;
    }

    const hostRect = hostEl.getBoundingClientRect();
    // Layout dimensions exclude the scale transform used by the entrance animation.
    const tooltipWidth = tooltipEl.offsetWidth;
    const tooltipHeight = tooltipEl.offsetHeight;
    const offset = 8;
    let pos = this.spTooltipPosition();

    // Auto-flip logic
    if (pos === 'top' && hostRect.top - tooltipHeight - offset < 8) {
      pos = 'bottom';
    } else if (pos === 'bottom' && hostRect.bottom + tooltipHeight + offset > window.innerHeight - 8) {
      pos = 'top';
    } else if (pos === 'left' && hostRect.left - tooltipWidth - offset < 8) {
      pos = 'right';
    } else if (pos === 'right' && hostRect.right + tooltipWidth + offset > window.innerWidth - 8) {
      pos = 'left';
    }

    let top = 0;
    let left = 0;

    switch (pos) {
      case 'top':
        top = hostRect.top - tooltipHeight - offset;
        left = hostRect.left + (hostRect.width - tooltipWidth) / 2;
        break;
      case 'bottom':
        top = hostRect.bottom + offset;
        left = hostRect.left + (hostRect.width - tooltipWidth) / 2;
        break;
      case 'left':
        top = hostRect.top + (hostRect.height - tooltipHeight) / 2;
        left = hostRect.left - tooltipWidth - offset;
        break;
      case 'right':
        top = hostRect.top + (hostRect.height - tooltipHeight) / 2;
        left = hostRect.right + offset;
        break;
    }

    // Keep the panel within the viewport on both axes
    left = Math.max(8, Math.min(left, window.innerWidth - tooltipWidth - 8));

    top = Math.max(8, Math.min(top, window.innerHeight - tooltipHeight - 8));

    const instance = this.tooltipRef.instance;
    instance.position.set(pos);
    instance.top.set(Math.round(top));
    instance.left.set(Math.round(left));
    this.tooltipRef.changeDetectorRef.detectChanges();
  }

  /**
   * Dismisses and destroys the tooltip overlay.
   * @returns void
   */
  public hide(): void {
    this.clearTimeout();
    if (!this.tooltipRef) {
      return;
    }

    this.removeListeners();
    this.appRef.detachView(this.tooltipRef.hostView);
    this.tooltipRef.destroy();
    this.tooltipRef = null;
  }

  /**
   * Clears the pending timeout timer.
   * @returns void
   */
  private clearTimeout(): void {
    if (this.showTimeoutId) {
      clearTimeout(this.showTimeoutId);
      this.showTimeoutId = null;
    }
  }

  /**
   * Removes global scroll and resize listeners.
   * @returns void
   */
  private removeListeners(): void {
    this.resizeObserver?.disconnect();
    this.resizeObserver = null;

    if (this.scrollListener) {
      window.removeEventListener('scroll', this.scrollListener, true);
      window.removeEventListener('resize', this.scrollListener);
      this.scrollListener = null;
    }
  }

  /**
   * Lifecycle cleanup hook.
   * @returns void
   */
  public ngOnDestroy(): void {
    this.hide();
  }
}
