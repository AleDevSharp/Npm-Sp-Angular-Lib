// --------------------------------------------------------------
// Project: SpLib
// File name: sp-ripple.directive.spec.ts
// File description: Unit tests for SpRippleDirective.
// Author: Alessio Giacché
// Date created: 11-11-2026
// License: MIT
// --------------------------------------------------------------

import { Component, ElementRef, viewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { SpRippleDirective } from './sp-ripple.directive';

@Component({
  standalone: true,
  imports: [SpRippleDirective],
  template: `
    <button
      #buttonEl
      spRipple
      [spRippleDisabled]="disabled"
      [spRippleColor]="color"
      [spRippleCentered]="centered"
      [spRippleUnbounded]="unbounded"
      [spRippleDuration]="duration"
      style="width: 100px; height: 50px;">
      Click Me
    </button>
  `
})
class TestHostComponent {
  public buttonRef = viewChild<ElementRef<HTMLButtonElement>>('buttonEl');
  public rippleDir = viewChild(SpRippleDirective);

  public disabled = false;
  public color = '';
  public centered = false;
  public unbounded = false;
  public duration = 400;
}

describe('SpRippleDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let component: TestHostComponent;
  let buttonEl: HTMLButtonElement;
  let directive: SpRippleDirective;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent, SpRippleDirective]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    buttonEl = component.buttonRef()!.nativeElement;
    directive = component.rippleDir()!;
  });

  it('should create and attach directive to host', () => {
    expect(directive).toBeTruthy();
    expect(buttonEl.classList.contains('sp-ripple-host')).toBeTrue();
  });

  it('should create ripple ink element on pointerdown', () => {
    const pointerEvent = new PointerEvent('pointerdown', {
      button: 0,
      clientX: 20,
      clientY: 20,
      bubbles: true
    });

    buttonEl.dispatchEvent(pointerEvent);
    fixture.detectChanges();

    const ink = buttonEl.querySelector('.sp-ripple-ink');
    expect(ink).toBeTruthy();
  });

  it('should not create ripple if disabled', () => {
    component.disabled = true;
    fixture.detectChanges();

    const pointerEvent = new PointerEvent('pointerdown', {
      button: 0,
      clientX: 20,
      clientY: 20,
      bubbles: true
    });

    buttonEl.dispatchEvent(pointerEvent);
    fixture.detectChanges();

    const ink = buttonEl.querySelector('.sp-ripple-ink');
    expect(ink).toBeNull();
  });

  it('should apply custom ripple color', () => {
    component.color = 'rgb(255, 0, 0)';
    fixture.detectChanges();

    const pointerEvent = new PointerEvent('pointerdown', {
      button: 0,
      clientX: 10,
      clientY: 10,
      bubbles: true
    });

    buttonEl.dispatchEvent(pointerEvent);
    fixture.detectChanges();

    const ink = buttonEl.querySelector('.sp-ripple-ink') as HTMLElement;
    expect(ink).toBeTruthy();
    expect(ink.style.backgroundColor).toBe('rgb(255, 0, 0)');
  });

  it('should support programmatic launch()', () => {
    directive.launch(50, 25);
    fixture.detectChanges();

    const ink = buttonEl.querySelector('.sp-ripple-ink');
    expect(ink).toBeTruthy();
  });

  it('should trigger ripple on Enter keydown', () => {
    const keyEvent = new KeyboardEvent('keydown', {
      key: 'Enter',
      code: 'Enter',
      bubbles: true
    });

    buttonEl.dispatchEvent(keyEvent);
    fixture.detectChanges();

    const ink = buttonEl.querySelector('.sp-ripple-ink');
    expect(ink).toBeTruthy();
  });

  it('should remove ink element after animation duration', fakeAsync(() => {
    directive.launch(50, 25);
    fixture.detectChanges();

    expect(buttonEl.querySelector('.sp-ripple-ink')).toBeTruthy();

    tick(component.duration + 150);
    fixture.detectChanges();

    expect(buttonEl.querySelector('.sp-ripple-ink')).toBeNull();
  }));
});
