// --------------------------------------------------------------
// Project: SpLib
// File name: sp-modal.component.spec.ts
// File description: Unit tests for the SpModalComponent.
// Author: Alessio Giacché
// Date created: 11-11-2026
// License: MIT
// --------------------------------------------------------------

import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpModalComponent } from './sp-modal.component';

@Component({
  standalone: true,
  imports: [SpModalComponent],
  template: `
    <sp-modal
      [(visible)]="isOpen"
      [title]="modalTitle"
      [size]="modalSize"
      [closeOnEscape]="closeOnEscape"
      [closeOnBackdrop]="closeOnBackdrop"
      (opened)="onOpened()"
      (closed)="onClosed()">
      <p class="test-content">Contenuto modale di prova</p>
      <div spModalFooter>
        <button class="footer-btn">Azione</button>
      </div>
    </sp-modal>
  `
})
class TestHostComponent {
  public isOpen = false;
  public modalTitle = 'Titolo Modale Test';
  public modalSize: any = 'md';
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

describe('SpModalComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent, SpModalComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should not render dialog in DOM when visible is false', () => {
    const dialog = fixture.nativeElement.querySelector('.sp-modal-dialog');
    expect(dialog).toBeNull();
  });

  it('should render dialog when visible is set to true', () => {
    host.isOpen = true;
    fixture.detectChanges();

    const dialog = fixture.nativeElement.querySelector('.sp-modal-dialog');
    expect(dialog).not.toBeNull();
    expect(dialog.getAttribute('role')).toBe('dialog');
    expect(dialog.getAttribute('aria-modal')).toBe('true');
  });

  it('should display the specified title in the header', () => {
    host.isOpen = true;
    fixture.detectChanges();

    const titleEl = fixture.nativeElement.querySelector('.sp-modal-title');
    expect(titleEl?.textContent?.trim()).toBe('Titolo Modale Test');
  });

  it('should project body content and footer', () => {
    host.isOpen = true;
    fixture.detectChanges();

    const content = fixture.nativeElement.querySelector('.test-content');
    const footerBtn = fixture.nativeElement.querySelector('.footer-btn');

    expect(content?.textContent?.trim()).toBe('Contenuto modale di prova');
    expect(footerBtn).not.toBeNull();
  });

  it('should close when clicking on the close button', () => {
    host.isOpen = true;
    fixture.detectChanges();

    const closeBtn = fixture.nativeElement.querySelector('.sp-modal-close-btn');
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

  it('should close when clicking on the backdrop overlay', () => {
    host.isOpen = true;
    fixture.detectChanges();

    const overlay = fixture.nativeElement.querySelector('.sp-modal-overlay');
    overlay.click();
    fixture.detectChanges();

    expect(host.isOpen).toBeFalse();
  });
});
