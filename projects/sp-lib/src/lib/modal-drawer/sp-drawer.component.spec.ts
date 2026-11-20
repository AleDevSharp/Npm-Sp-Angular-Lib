// --------------------------------------------------------------
// Project: SpLib
// File name: sp-drawer.component.spec.ts
// File description: Unit tests for the SpDrawerComponent.
// Author: Alessio Giacché
// Date created: 11-11-2026
// License: MIT
// --------------------------------------------------------------

import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpDrawerComponent } from './sp-drawer.component';

@Component({
  standalone: true,
  imports: [SpDrawerComponent],
  template: `
    <sp-drawer
      [(visible)]="isOpen"
      [title]="drawerTitle"
      [placement]="placement"
      [size]="drawerSize"
      [closeOnEscape]="closeOnEscape"
      [closeOnBackdrop]="closeOnBackdrop"
      (opened)="onOpened()"
      (closed)="onClosed()">
      <p class="drawer-content">Pannello di navigazione laterale</p>
      <div spDrawerFooter>
        <button class="drawer-footer-btn">Salva</button>
      </div>
    </sp-drawer>
  `
})
class TestDrawerHostComponent {
  public isOpen = false;
  public drawerTitle = 'Pannello Filtri';
  public placement: any = 'right';
  public drawerSize: any = 'md';
  public closeOnEscape = true;
  public closeOnBackdrop = true;
  public openedCount = 0;
  public closedCount = 0;

  public onOpened(): void {
    this.openedCount++;
  }

  public onClosed(): void {
    this.closedCount++;
  }
}

describe('SpDrawerComponent', () => {
  let fixture: ComponentFixture<TestDrawerHostComponent>;
  let host: TestDrawerHostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestDrawerHostComponent, SpDrawerComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestDrawerHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should not render drawer in DOM when visible is false', () => {
    const panel = fixture.nativeElement.querySelector('.sp-drawer-panel');
    expect(panel).toBeNull();
  });

  it('should render drawer panel when visible is true', () => {
    host.isOpen = true;
    fixture.detectChanges();

    const panel = fixture.nativeElement.querySelector('.sp-drawer-panel');
    expect(panel).not.toBeNull();
    expect(panel.getAttribute('role')).toBe('dialog');
    expect(panel.getAttribute('aria-modal')).toBe('true');
  });

  it('should apply placement and size CSS classes', () => {
    host.isOpen = true;
    host.placement = 'left';
    host.drawerSize = 'lg';
    fixture.detectChanges();

    const panel = fixture.nativeElement.querySelector('.sp-drawer-panel');
    expect(panel.classList.contains('sp-drawer-left')).toBeTrue();
    expect(panel.classList.contains('sp-drawer-lg')).toBeTrue();
  });

  it('should display the title text and projected content', () => {
    host.isOpen = true;
    fixture.detectChanges();

    const titleEl = fixture.nativeElement.querySelector('.sp-drawer-title');
    const content = fixture.nativeElement.querySelector('.drawer-content');
    const footerBtn = fixture.nativeElement.querySelector('.drawer-footer-btn');

    expect(titleEl?.textContent?.trim()).toBe('Pannello Filtri');
    expect(content?.textContent?.trim()).toBe('Pannello di navigazione laterale');
    expect(footerBtn).not.toBeNull();
  });

  it('should close when clicking on the close button', () => {
    host.isOpen = true;
    fixture.detectChanges();

    const closeBtn = fixture.nativeElement.querySelector('.sp-drawer-close-btn');
    closeBtn.click();
    fixture.detectChanges();

    expect(host.isOpen).toBeFalse();
    expect(host.closedCount).toBeGreaterThan(0);
  });

  it('should close on Escape key press if closeOnEscape is true', () => {
    host.isOpen = true;
    fixture.detectChanges();

    const event = new KeyboardEvent('keydown', { key: 'Escape' });
    document.dispatchEvent(event);
    fixture.detectChanges();

    expect(host.isOpen).toBeFalse();
  });

  it('should close on backdrop overlay click', () => {
    host.isOpen = true;
    fixture.detectChanges();

    const overlay = fixture.nativeElement.querySelector('.sp-drawer-overlay');
    overlay.click();
    fixture.detectChanges();

    expect(host.isOpen).toBeFalse();
  });
});
