// --------------------------------------------------------------
// Project: SpLib
// File name: sp-avatar.component.spec.ts
// File description: Unit tests for SpAvatarComponent.
// Author: Alessio Giacché
// Date created: 11-11-2026
// License: MIT
// --------------------------------------------------------------

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpAvatarComponent } from './sp-avatar.component';

describe('SpAvatarComponent', () => {
  let component: SpAvatarComponent;
  let fixture: ComponentFixture<SpAvatarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpAvatarComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SpAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should extract two uppercase initials from full name', () => {
    fixture.componentRef.setInput('name', 'Alessio Giacché');
    fixture.detectChanges();

    expect(component.initials()).toBe('AG');
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.sp-avatar-initials')?.textContent?.trim()).toBe('AG');
  });

  it('should extract single initial from single word name', () => {
    fixture.componentRef.setInput('name', 'Developer');
    fixture.detectChanges();

    expect(component.initials()).toBe('D');
  });

  it('should render image when src is provided and no error occurred', () => {
    fixture.componentRef.setInput('src', 'https://example.com/avatar.jpg');
    fixture.componentRef.setInput('name', 'Mario Rossi');
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const img = compiled.querySelector<HTMLImageElement>('.sp-avatar-img');
    expect(img).not.toBeNull();
    expect(img?.src).toContain('avatar.jpg');
  });

  it('should fallback to initials when image trigger error event', () => {
    fixture.componentRef.setInput('src', 'https://invalid-url.com/broken.jpg');
    fixture.componentRef.setInput('name', 'Mario Rossi');
    fixture.detectChanges();

    component.onImageError();
    fixture.detectChanges();

    expect(component.shouldShowImage()).toBeFalse();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.sp-avatar-img')).toBeNull();
    expect(compiled.querySelector('.sp-avatar-initials')?.textContent?.trim()).toBe('MR');
  });

  it('should render status presence dot when status is specified', () => {
    fixture.componentRef.setInput('status', 'online');
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const statusDot = compiled.querySelector('.sp-avatar-status');
    expect(statusDot).not.toBeNull();
    expect(statusDot?.classList.contains('sp-avatar-status--online')).toBeTrue();
  });
  it('should expose presence in the accessible name and remove it when status is cleared', () => {
    fixture.componentRef.setInput('name', 'Alex Morgan');
    fixture.componentRef.setInput('status', 'online');
    fixture.detectChanges();
    const avatar = fixture.nativeElement.querySelector('.sp-avatar') as HTMLElement;
    expect(avatar.getAttribute('aria-label')).toBe('Alex Morgan — online');

    fixture.componentRef.setInput('status', undefined);
    fixture.detectChanges();
    expect(avatar.getAttribute('aria-label')).toBe('Alex Morgan');
    expect(avatar.querySelector('.sp-avatar-status')).toBeNull();
  });
});
