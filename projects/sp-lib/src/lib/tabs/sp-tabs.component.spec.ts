// --------------------------------------------------------------
// Project: SpLib
// File name: sp-tabs.component.spec.ts
// File description: Unit tests for SpTabsComponent and SpTabComponent.
// Author: Alessio Giacché
// Date created: 11-11-2026
// License: MIT
// --------------------------------------------------------------

import { Component } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { SpTabComponent } from './sp-tab.component';
import { SpTabsComponent } from './sp-tabs.component';

@Component({
  standalone: true,
  imports: [SpTabsComponent, SpTabComponent],
  template: `
    <sp-tabs [(selectedIndex)]="currentIndex" [variant]="variant" [orientation]="orientation">
      <sp-tab label="Overview" badge="3">
        <p class="tab-1-content">Overview Content</p>
      </sp-tab>
      <sp-tab label="Analytics">
        <p class="tab-2-content">Analytics Content</p>
      </sp-tab>
      <sp-tab label="Reports" [disabled]="true">
        <p class="tab-3-content">Reports Content</p>
      </sp-tab>
      <sp-tab label="Settings">
        <p class="tab-4-content">Settings Content</p>
      </sp-tab>
    </sp-tabs>
  `
})
class TestTabsHostComponent {
  // The visual variant under test
  public variant: 'line' | 'pill' | 'enclosed' = 'line';

  // The layout orientation under test
  public orientation: 'horizontal' | 'vertical' = 'horizontal';

  public currentIndex = 0;
}

describe('SpTabsComponent', () => {
  let fixture: ComponentFixture<TestTabsHostComponent>;
  let hostComponent: TestTabsHostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestTabsHostComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestTabsHostComponent);
    hostComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the tabs component', () => {
    expect(hostComponent).toBeTruthy();
  });

  it('should render all tab headers with labels and badges', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const headerButtons = compiled.querySelectorAll('.sp-tab-header-btn');

    expect(headerButtons.length).toBe(4);
    expect(headerButtons[0].textContent).toContain('Overview');
    expect(headerButtons[0].textContent).toContain('3');
    expect(headerButtons[1].textContent).toContain('Analytics');
  });

  it('should display only the active tab content panel', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('.tab-1-content')).not.toBeNull();
    expect(compiled.querySelector('.tab-2-content')).toBeNull();
  });

  it('should switch tab and display new content when header is clicked', fakeAsync(() => {
    const compiled = fixture.nativeElement as HTMLElement;
    const headerButtons = compiled.querySelectorAll<HTMLButtonElement>('.sp-tab-header-btn');

    headerButtons[1].click();
    tick();
    fixture.detectChanges();

    expect(hostComponent.currentIndex).toBe(1);
    expect(compiled.querySelector('.tab-1-content')).toBeNull();
    expect(compiled.querySelector('.tab-2-content')).not.toBeNull();
  }));

  it('should not switch to a disabled tab', fakeAsync(() => {
    const compiled = fixture.nativeElement as HTMLElement;
    const headerButtons = compiled.querySelectorAll<HTMLButtonElement>('.sp-tab-header-btn');

    // Tab 2 (index 2) is disabled
    headerButtons[2].click();
    tick();
    fixture.detectChanges();

    expect(hostComponent.currentIndex).toBe(0);
    expect(compiled.querySelector('.tab-1-content')).not.toBeNull();
  }));

  it('should support keyboard navigation skipping disabled tabs', fakeAsync(() => {
    const compiled = fixture.nativeElement as HTMLElement;
    const tablist = compiled.querySelector<HTMLElement>('.sp-tablist')!;

    // Current is index 0. ArrowRight moves to index 1
    tablist.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
    tick();
    fixture.detectChanges();
    expect(hostComponent.currentIndex).toBe(1);

    // ArrowRight again: next is index 2 (disabled), so it jumps to index 3
    tablist.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
    tick();
    fixture.detectChanges();
    expect(hostComponent.currentIndex).toBe(3);
  }));
  it('should remeasure the indicator when the variant changes without changing selection', fakeAsync(() => {
    const tabs = fixture.debugElement.children[0].componentInstance as SpTabsComponent;
    hostComponent.currentIndex = 1;
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    const header = fixture.nativeElement.querySelector('[role="tab"][aria-selected="true"]') as HTMLElement;
    expect(tabs.indicatorHeight()).toBe(2);
    expect(tabs.indicatorTop()).toBe(header.offsetTop + header.offsetHeight - 2);

    hostComponent.variant = 'pill';
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    expect(tabs.indicatorLeft()).toBe(header.offsetLeft);
    expect(tabs.indicatorTop()).toBe(header.offsetTop);
    expect(tabs.indicatorHeight()).toBe(header.offsetHeight);
    expect(hostComponent.currentIndex).toBe(1);
  }));

  it('should place the vertical line at the right edge of the active header', fakeAsync(() => {
    hostComponent.orientation = 'vertical';
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    const tabs = fixture.debugElement.children[0].componentInstance as SpTabsComponent;
    const header = fixture.nativeElement.querySelector('[role="tab"][aria-selected="true"]') as HTMLElement;
    expect(tabs.indicatorWidth()).toBe(2);
    expect(tabs.indicatorLeft()).toBe(header.offsetLeft + header.offsetWidth - 2);
    expect(tabs.indicatorTop()).toBe(header.offsetTop);
    expect(tabs.indicatorHeight()).toBe(header.offsetHeight);
  }));

});
