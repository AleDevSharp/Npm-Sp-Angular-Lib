// --------------------------------------------------------------
// Project: SpLib
// File name: sp-tabs.component.ts
// File description: Animated tabs container featuring sliding physical indicator, keyboard navigation, and responsive orientation.
// Author: Alessio Giacché
// Date created: 11-11-2026
// License: MIT
// --------------------------------------------------------------

// Import
import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  contentChildren,
  effect,
  ElementRef,
  forwardRef,
  inject,
  input,
  model,
  OnDestroy,
  output,
  signal,
  viewChildren
} from '@angular/core';

import { SpTabComponent } from './sp-tab.component';
import { SP_TABS, SpTabsContainer, SpTabsOrientation, SpTabsSize, SpTabsVariant } from './sp-tabs.types';

/**
 * SpTabsComponent
 * Animated navigation tabs with smooth sliding active indicator and WAI-ARIA keyboard navigation.
 * @version 1.0.0
 * @since 2.0.0
 * @author Alessio Giacché
 */
@Component({
  selector: 'sp-tabs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sp-tabs.component.html',
  styleUrl: './sp-tabs.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: SP_TABS,
      useExisting: forwardRef(() => SpTabsComponent)
    }
  ]
})
export class SpTabsComponent implements SpTabsContainer, AfterViewInit, OnDestroy {
  // The host element reference
  private readonly hostElement = inject(ElementRef<HTMLElement>);

  // Visual styling variant of the tabs
  public variant = input<SpTabsVariant>('line');

  // Layout orientation: horizontal or vertical
  public orientation = input<SpTabsOrientation>('horizontal');

  // Sizing scale preset for typography and padding
  public size = input<SpTabsSize>('md');

  // Two-way model binding indicating the active selected tab index
  public selectedIndex = model<number>(0);

  // Output event emitted whenever the selected tab index changes
  public tabChange = output<number>();

  // Query of projected tab panel components
  public tabs = contentChildren<SpTabComponent>(SpTabComponent);

  // References to all tab header button elements
  public tabHeaders = viewChildren<ElementRef<HTMLButtonElement>>('tabHeaderBtn');

  // Left offset of the sliding indicator
  public indicatorLeft = signal<number>(0);

  // Top offset of the sliding indicator
  public indicatorTop = signal<number>(0);

  // Width of the sliding indicator
  public indicatorWidth = signal<number>(0);

  // Height of the sliding indicator
  public indicatorHeight = signal<number>(0);

  // Whether indicator measurements are settled and ready to display
  public indicatorReady = signal<boolean>(false);

  // ResizeObserver instance tracking host container resize
  private resizeObserver: ResizeObserver | null = null;

  /**
   * Constructor for SpTabsComponent component
   */
  constructor() {
    // Synchronize the active panels and indicator when selection or layout changes.
    effect(() => {
      this.variant();
      this.orientation();
      this.size();
      const index = this.selectedIndex();
      const tabList = this.tabs();

      for (let i = 0; i < tabList.length; i++) {
        tabList[i].active.set(i === index);
      }

      this.updateIndicatorPosition();
    });
  }

  /**
   * Lifecycle hook invoked after view initialization.
   * @returns void
   */
  public ngAfterViewInit(): void {
    this.updateIndicatorPosition();

    if (typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver(() => {
        this.updateIndicatorPosition();
      });
      this.resizeObserver.observe(this.hostElement.nativeElement);
    }
  }

  /**
   * Lifecycle hook invoked when the component is destroyed.
   * @returns void
   */
  public ngOnDestroy(): void {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }
  }

  /**
   * Selects a tab by index if not disabled.
   * @param index The zero-based index of the tab to activate
   * @returns void
   */
  public selectTab(index: number): void {
    const tabList = this.tabs();
    if (!tabList || index < 0 || index >= tabList.length) {
      return;
    }

    if (tabList[index].disabled()) {
      return;
    }

    if (this.selectedIndex() !== index) {
      this.selectedIndex.set(index);
      this.tabChange.emit(index);
      this.updateIndicatorPosition();
    }
  }

  /**
   * Handles keyboard navigation inside the tablist header.
   * @param event The keyboard event
   * @returns void
   */
  public onKeyDown(event: KeyboardEvent): void {
    const tabList = this.tabs();
    if (!tabList || tabList.length === 0) {
      return;
    }

    const currentIndex = this.selectedIndex();
    let nextIndex = -1;

    const isHorizontal = this.orientation() === 'horizontal';

    switch (event.key) {
      case isHorizontal ? 'ArrowRight' : 'ArrowDown':
        event.preventDefault();
        nextIndex = this.findNextEnabledIndex(currentIndex, 1);
        break;

      case isHorizontal ? 'ArrowLeft' : 'ArrowUp':
        event.preventDefault();
        nextIndex = this.findNextEnabledIndex(currentIndex, -1);
        break;

      case 'Home':
        event.preventDefault();
        nextIndex = this.findNextEnabledIndex(-1, 1);
        break;

      case 'End':
        event.preventDefault();
        nextIndex = this.findNextEnabledIndex(tabList.length, -1);
        break;

      default:
        return;
    }

    if (nextIndex >= 0 && nextIndex < tabList.length) {
      this.selectTab(nextIndex);
      const headers = this.tabHeaders();
      if (headers[nextIndex]) {
        headers[nextIndex].nativeElement.focus();
      }
    }
  }

  /**
   * Recomputes and updates the sliding indicator dimensions and position.
   * @returns void
   */
  public updateIndicatorPosition(): void {
    setTimeout(() => {
      const headers = this.tabHeaders();
      const index = this.selectedIndex();

      if (!headers || headers.length === 0 || !headers[index]) {
        this.indicatorReady.set(false);
        return;
      }

      const activeHeader = headers[index].nativeElement;

      const isLine = this.variant() === 'line';
      const isVertical = this.orientation() === 'vertical';
      this.indicatorLeft.set(activeHeader.offsetLeft + (isLine && isVertical ? activeHeader.offsetWidth - 2 : 0));
      this.indicatorTop.set(activeHeader.offsetTop + (isLine && !isVertical ? activeHeader.offsetHeight - 2 : 0));
      this.indicatorWidth.set(isLine && isVertical ? 2 : activeHeader.offsetWidth);
      this.indicatorHeight.set(isLine && !isVertical ? 2 : activeHeader.offsetHeight);
      this.indicatorReady.set(true);
    }, 0);
  }

  /**
   * Finds the next enabled tab index cycling in the search direction.
   * @param startIndex The initial index
   * @param step The search increment (+1 or -1)
   * @returns number The next enabled index
   */
  private findNextEnabledIndex(startIndex: number, step: number): number {
    const tabList = this.tabs();
    const count = tabList.length;
    let index = startIndex;

    for (let i = 0; i < count; i++) {
      index = (index + step + count) % count;
      if (!tabList[index].disabled()) {
        return index;
      }
    }

    return startIndex;
  }
}
