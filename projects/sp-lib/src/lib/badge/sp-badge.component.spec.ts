// --------------------------------------------------------------
// Project: SpLib
// File name: sp-badge.component.spec.ts
// File description: Unit tests for SpBadgeComponent.
// Author: Alessio Giacché
// Date created: 11-11-2026
// License: MIT
// --------------------------------------------------------------

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpBadgeComponent } from './sp-badge.component';

describe('SpBadgeComponent', () => {
  let component: SpBadgeComponent;
  let fixture: ComponentFixture<SpBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpBadgeComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SpBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display text content', () => {
    fixture.componentRef.setInput('content', 'New');
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const textElement = compiled.querySelector('.sp-badge-text');
    expect(textElement?.textContent?.trim()).toBe('New');
  });

  it('should format overflow counter when number exceeds max', () => {
    fixture.componentRef.setInput('content', 120);
    fixture.componentRef.setInput('max', 99);
    fixture.detectChanges();

    expect(component.displayContent()).toBe('99+');
    const compiled = fixture.nativeElement as HTMLElement;
    const textElement = compiled.querySelector('.sp-badge-text');
    expect(textElement?.textContent?.trim()).toBe('99+');
  });

  it('should render as dot without text', () => {
    fixture.componentRef.setInput('dot', true);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const badgeElement = compiled.querySelector('.sp-badge-element');
    expect(badgeElement?.classList.contains('sp-badge--dot')).toBeTrue();
    expect(compiled.querySelector('.sp-badge-text')).toBeNull();
  });

  it('should render radar ping element when pulse is true', () => {
    fixture.componentRef.setInput('pulse', true);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.sp-badge-ping')).not.toBeNull();
  });

  it('should not render badge element when hidden is true', () => {
    fixture.componentRef.setInput('hidden', true);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.sp-badge-element')).toBeNull();
  });
});
