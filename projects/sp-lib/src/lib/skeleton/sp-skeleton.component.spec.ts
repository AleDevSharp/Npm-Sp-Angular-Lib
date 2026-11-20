// --------------------------------------------------------------
// Project: SpLib
// File name: sp-skeleton.component.spec.ts
// File description: Unit tests for SpSkeletonComponent.
// Author: Alessio Giacché
// Date created: 11-11-2026
// License: MIT
// --------------------------------------------------------------

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpSkeletonComponent } from './sp-skeleton.component';

describe('SpSkeletonComponent', () => {
  let component: SpSkeletonComponent;
  let fixture: ComponentFixture<SpSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpSkeletonComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SpSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render single text placeholder by default', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const item = compiled.querySelector('.sp-skeleton-item');

    expect(item).not.toBeNull();
    expect(item?.classList.contains('sp-skeleton--text')).toBeTrue();
    expect(item?.classList.contains('sp-skeleton--animated')).toBeTrue();
  });

  it('should render multiple lines when lines input > 1', () => {
    fixture.componentRef.setInput('lines', 3);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const items = compiled.querySelectorAll('.sp-skeleton-item');

    expect(items.length).toBe(3);
    // Last line should have 65% width
    expect((items[2] as HTMLElement).style.width).toBe('65%');
  });

  it('should render circle variant for avatar placeholder', () => {
    fixture.componentRef.setInput('variant', 'circle');
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const circle = compiled.querySelector('.sp-skeleton--circle');

    expect(circle).not.toBeNull();
  });

  it('should render rectangular variant with custom dimensions', () => {
    fixture.componentRef.setInput('variant', 'rect');
    fixture.componentRef.setInput('width', 300);
    fixture.componentRef.setInput('height', 150);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const rect = compiled.querySelector<HTMLElement>('.sp-skeleton--rect');

    expect(rect).not.toBeNull();
    expect(rect?.style.width).toBe('300px');
    expect(rect?.style.height).toBe('150px');
  });

  it('should disable animation when animated is false', () => {
    fixture.componentRef.setInput('animated', false);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const item = compiled.querySelector('.sp-skeleton-item');

    expect(item?.classList.contains('sp-skeleton--animated')).toBeFalse();
  });
});
