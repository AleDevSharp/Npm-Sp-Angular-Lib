// --------------------------------------------------------------
// Project: SpLib
// File name: sp-ripple.directive.ts
// File description: Modern directive providing a fluid radial ripple wave effect on user interaction.
// Author: Alessio Giacché
// Date created: 11-11-2026
// License: MIT
// --------------------------------------------------------------

// Import
import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  NgZone,
  Renderer2,
  computed,
  inject,
  input
} from '@angular/core';

import { SP_RIPPLE_DEFAULT_DURATION, SpRippleConfig } from './sp-ripple.types';

/**
 * SpRippleDirective
 * Creates a fluid radial expanding ink ripple wave originating from the user click or touch coordinates.
 *
 * @version 1.0.0
 * @since 2.0.0
 * @author Alessio Giacché
 */
@Directive({
  selector: '[spRipple]',
  exportAs: 'spRipple',
  standalone: true
})
export class SpRippleDirective {
  // Reference to host DOM element
  private elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

  // Angular Renderer for safe DOM manipulations
  private renderer = inject(Renderer2);

  // Angular NgZone for running animations outside zone if desired
  private zone = inject(NgZone);

  // The shorthand input or explicit enable/disable toggle
  public spRipple = input<boolean | string | undefined>(undefined);

  // The custom ripple wave color (overrides default theme color)
  public spRippleColor = input<string>('');

  // The duration of the wave expansion animation in milliseconds
  public spRippleDuration = input<number>(SP_RIPPLE_DEFAULT_DURATION);

  // The whether the ripple originates from the exact element center
  public spRippleCentered = input<boolean>(false);

  // The whether the ripple is unbounded and extends outside host overflow
  public spRippleUnbounded = input<boolean>(false);

  // The whether the ripple interaction is disabled
  public spRippleDisabled = input<boolean>(false);

  // The computed disabled state taking both shorthand and explicit input into account
  public isDisabled = computed<boolean>(() => {
    if (this.spRippleDisabled()) {
      return true;
    }
    const main = this.spRipple();
    return typeof main === 'boolean' ? !main : false;
  });

  // The computed color taking both shorthand color and explicit color into account
  public activeColor = computed<string>(() => {
    const explicit = this.spRippleColor();
    if (explicit) {
      return explicit;
    }
    const main = this.spRipple();
    return typeof main === 'string' && main.trim() !== '' ? main : '';
  });

  // Base host class shared by bounded and unbounded ripple modes
  @HostBinding('class.sp-ripple-host')
  public get hasRippleHost(): boolean {
    return true;
  }

  // Host class binding for unbounded ripple
  @HostBinding('class.sp-ripple-unbounded')
  public get isUnbounded(): boolean {
    return this.spRippleUnbounded();
  }

  /**
   * Constructor for SpRippleDirective
   */
  constructor() {
    this.ensureRippleKeyframesInjected();
  }

  /**
   * Handles pointerdown event to launch a ripple at click coordinates.
   * @param event The pointer event
   * @returns void
   */
  @HostListener('pointerdown', ['$event'])
  public onPointerDown(event: PointerEvent): void {
    // Only respond to primary button (usually left click or touch)
    if (event.button !== 0 || this.isDisabled()) {
      return;
    }

    const host = this.elementRef.nativeElement;
    const rect = host.getBoundingClientRect();

    let clientX = event.clientX;
    let clientY = event.clientY;

    if (this.spRippleCentered()) {
      clientX = rect.left + rect.width / 2;
      clientY = rect.top + rect.height / 2;
    }

    this.createRipple(clientX, clientY, rect);
  }

  /**
   * Handles keyboard activation (Enter or Space) on interactive elements.
   * @param event The keyboard event
   * @returns void
   */
  @HostListener('keydown.enter', ['$event'])
  @HostListener('keydown.space', ['$event'])
  public onKeydown(event: KeyboardEvent): void {
    if (this.isDisabled()) {
      return;
    }

    const host = this.elementRef.nativeElement;
    const isButton = host.tagName === 'BUTTON' || host.getAttribute('role') === 'button';

    if (isButton) {
      const rect = host.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      this.createRipple(centerX, centerY, rect);
    }
  }

  /**
   * Programmatically launches a ripple at specified coordinates or center.
   * @param clientX Optional client X coordinate
   * @param clientY Optional client Y coordinate
   * @param config Optional configuration overrides
   * @returns void
   */
  public launch(clientX?: number, clientY?: number, config?: SpRippleConfig): void {
    if (config?.disabled ?? this.isDisabled()) {
      return;
    }

    const host = this.elementRef.nativeElement;
    const rect = host.getBoundingClientRect();

    const isCentered = config?.centered ?? this.spRippleCentered();
    const x = isCentered || clientX === undefined ? rect.left + rect.width / 2 : clientX;
    const y = isCentered || clientY === undefined ? rect.top + rect.height / 2 : clientY;

    this.createRipple(x, y, rect, config);
  }

  /**
   * Creates, animates and cleans up a ripple DOM element.
   * @param clientX The client X coordinate
   * @param clientY The client Y coordinate
   * @param rect The bounding client rect of host
   * @param config Optional runtime config overrides
   * @returns void
   */
  private createRipple(
    clientX: number,
    clientY: number,
    rect: DOMRect,
    config?: SpRippleConfig
  ): void {
    const host = this.elementRef.nativeElement;
    const duration = config?.duration ?? this.spRippleDuration();
    const color = config?.color ?? this.activeColor();
    const unbounded = config?.unbounded ?? this.spRippleUnbounded();

    // Ensure host has relative positioning if static
    if (typeof window !== 'undefined') {
      const style = window.getComputedStyle(host);
      if (style.position === 'static') {
        this.renderer.setStyle(host, 'position', 'relative');
      }
      this.renderer.setStyle(host, 'overflow', unbounded ? 'visible' : 'hidden');
    }

    const relativeX = clientX - rect.left;
    const relativeY = clientY - rect.top;

    // Radius calculation to cover the farthest corner
    const radius = unbounded
      ? Math.max(rect.width, rect.height) / 2
      : Math.hypot(
          Math.max(relativeX, rect.width - relativeX),
          Math.max(relativeY, rect.height - relativeY)
        );

    const diameter = radius * 2;
    const ink = this.renderer.createElement('span') as HTMLElement;

    this.renderer.addClass(ink, 'sp-ripple-ink');
    this.renderer.setStyle(ink, 'width', `${diameter}px`);
    this.renderer.setStyle(ink, 'height', `${diameter}px`);
    this.renderer.setStyle(ink, 'left', `${relativeX - radius}px`);
    this.renderer.setStyle(ink, 'top', `${relativeY - radius}px`);
    this.renderer.setStyle(ink, 'animation-duration', `${duration}ms`);

    if (color) {
      this.renderer.setStyle(ink, 'background-color', color);
    }

    this.renderer.appendChild(host, ink);

    // Remove ink after animation completes
    let cleanedUp = false;
    const cleanup = () => {
      if (cleanedUp) {
        return;
      }
      cleanedUp = true;
      if (ink.parentNode === host) {
        this.renderer.removeChild(host, ink);
      }
    };

    ink.addEventListener('animationend', cleanup, { once: true });
    // Safety fallback timer
    setTimeout(cleanup, duration + 100);
  }

  /**
   * Injects keyframe and base styling into document head if not present.
   * @returns void
   */
  private ensureRippleKeyframesInjected(): void {
    if (typeof document === 'undefined') {
      return;
    }

    const existingStyle = document.getElementById('sp-ripple-styles');
    if (existingStyle) {
      return;
    }

    const styleEl = document.createElement('style');
    styleEl.id = 'sp-ripple-styles';
    styleEl.textContent = `
      .sp-ripple-host {
        position: relative;
        overflow: hidden;
      }
      .sp-ripple-host.sp-ripple-unbounded {
        overflow: visible;
      }
      .sp-ripple-ink {
        position: absolute;
        border-radius: 50%;
        pointer-events: none;
        transform: scale(0);
        background-color: var(--sp-ripple-color, rgba(255, 255, 255, 0.35));
        animation: sp-ripple-wave cubic-bezier(0.16, 1, 0.3, 1) forwards;
        z-index: 10;
        will-change: transform, opacity;
      }
      @keyframes sp-ripple-wave {
        0% {
          transform: scale(0);
          opacity: 1;
        }
        100% {
          transform: scale(1);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(styleEl);
  }
}
