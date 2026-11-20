// --------------------------------------------------------------
// Project: SpLib
// File name: sp-marquee.component.spec.ts
// File description: Unit tests for SpMarqueeComponent verifying track duplication, pause states, and directions.
// Author: Alessio Giacché
// Date created: 11-11-2026
// License: MIT
// --------------------------------------------------------------

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpMarqueeComponent } from './sp-marquee.component';

describe('SpMarqueeComponent', () => {
  let component: SpMarqueeComponent;
  let fixture: ComponentFixture<SpMarqueeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpMarqueeComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SpMarqueeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component instance', () => {
    expect(component).toBeTruthy();
    expect(component.isPaused()).toBeFalse();
  });

  it('should render at least two tracks for seamless looping', () => {
    fixture.componentRef.setInput('items', ['Apple', 'Google', 'Microsoft']);
    fixture.detectChanges();

    const tracks = fixture.nativeElement.querySelectorAll('.sp-marquee-track');
    expect(tracks.length).toBeGreaterThanOrEqual(2);
  });

  it('should apply direction class and support reverse flag', () => {
    fixture.componentRef.setInput('direction', 'left');
    fixture.detectChanges();

    const wrapper = fixture.nativeElement.querySelector('.sp-marquee');
    expect(wrapper.classList.contains('sp-marquee-left')).toBeTrue();

    // Invert direction via reverse
    fixture.componentRef.setInput('reverse', true);
    fixture.detectChanges();

    expect(component.effectiveDirection()).toBe('right');
    expect(wrapper.classList.contains('sp-marquee-right')).toBeTrue();
  });

  it('should apply fade mask class when fade is enabled', () => {
    fixture.componentRef.setInput('fade', true);
    fixture.detectChanges();

    const wrapper = fixture.nativeElement.querySelector('.sp-marquee');
    expect(wrapper.classList.contains('sp-marquee-fade')).toBeTrue();
  });

  it('should pause and resume animation programmatically', () => {
    expect(component.isPaused()).toBeFalse();

    component.pause();
    expect(component.isPaused()).toBeTrue();

    component.play();
    expect(component.isPaused()).toBeFalse();

    component.togglePause();
    expect(component.isPaused()).toBeTrue();
  });

  it('should toggle pause on click when pauseOnClick is enabled', () => {
    fixture.componentRef.setInput('pauseOnClick', true);
    fixture.detectChanges();

    component.onContainerClick();
    expect(component.isPaused()).toBeTrue();

    component.onContainerClick();
    expect(component.isPaused()).toBeFalse();
  });

  it('should compute duration custom property from speed or explicit duration', () => {
    fixture.componentRef.setInput('speed', 35);
    fixture.detectChanges();

    let styles = component.containerStyles();
    expect(styles['--sp-marquee-duration']).toBe('35s');

    fixture.componentRef.setInput('duration', '18s');
    fixture.detectChanges();

    styles = component.containerStyles();
    expect(styles['--sp-marquee-duration']).toBe('18s');
  });
  it('should preserve manual pause while entering and leaving hover', () => {
    const wrapper = fixture.nativeElement.querySelector('.sp-marquee');
    wrapper.dispatchEvent(new MouseEvent('mouseenter'));
    fixture.detectChanges();
    expect(component.isPaused()).toBeFalse();
    expect(component.isEffectivelyPaused()).toBeTrue();
    component.pause();
    wrapper.dispatchEvent(new MouseEvent('mouseleave'));
    fixture.detectChanges();
    expect(component.isEffectivelyPaused()).toBeTrue();
    component.play();
    fixture.detectChanges();
    expect(component.isEffectivelyPaused()).toBeFalse();
    expect(wrapper.classList.contains('sp-marquee-paused')).toBeFalse();
  });

  it('should reflect hover option changes without losing manual pause', () => {
    component.onMouseEnter();
    fixture.componentRef.setInput('pauseOnHover', false);
    fixture.detectChanges();
    expect(component.isEffectivelyPaused()).toBeFalse();
    component.pause();
    fixture.componentRef.setInput('pauseOnHover', true);
    component.onMouseLeave();
    fixture.detectChanges();
    expect(component.isEffectivelyPaused()).toBeTrue();
  });
});
