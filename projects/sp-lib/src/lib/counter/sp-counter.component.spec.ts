// --------------------------------------------------------------
// Project: SpLib
// File name: sp-counter.component.spec.ts
// File description: Unit tests for SpCounterComponent.
// Author: Alessio Giacché
// Date created: 11-11-2026
// License: MIT
// --------------------------------------------------------------

import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { SpCounterComponent } from './sp-counter.component';

describe('SpCounterComponent', () => {
  let component: SpCounterComponent;
  let fixture: ComponentFixture<SpCounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpCounterComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SpCounterComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('autoplay', false);
    fixture.componentRef.setInput('viewportTrigger', false);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should format numbers with thousands separator, prefix and suffix', () => {
    fixture.componentRef.setInput('from', 1250000);
    fixture.componentRef.setInput('prefix', '€ ');
    fixture.componentRef.setInput('suffix', ' /anno');
    fixture.componentRef.setInput('thousandSeparator', '.');
    fixture.detectChanges();

    component.currentValue.set(1250000);
    fixture.detectChanges();

    expect(component.displayValue()).toBe('€ 1.250.000 /anno');
  });

  it('should format decimals with custom separator', () => {
    fixture.componentRef.setInput('from', 98.75);
    fixture.componentRef.setInput('decimals', 2);
    fixture.componentRef.setInput('decimalSeparator', ',');
    fixture.detectChanges();

    component.currentValue.set(98.75);
    fixture.detectChanges();

    expect(component.displayValue()).toBe('98,75');
  });

  it('should animate to target value and emit counterEnd', fakeAsync(() => {
    spyOn(component.counterEnd, 'emit');
    fixture.componentRef.setInput('from', 0);
    fixture.componentRef.setInput('to', 100);
    fixture.componentRef.setInput('duration', 300);
    fixture.detectChanges();

    component.start();
    expect(component.isCounting()).toBeTrue();

    // Advance time beyond duration
    tick(400);
    fixture.detectChanges();

    expect(component.currentValue()).toBe(100);
    expect(component.isCompleted()).toBeTrue();
    expect(component.counterEnd.emit).toHaveBeenCalledWith(100);
  }));

  it('should reset value back to from input', () => {
    fixture.componentRef.setInput('from', 10);
    fixture.componentRef.setInput('to', 500);
    fixture.detectChanges();

    component.currentValue.set(300);
    component.reset();

    expect(component.currentValue()).toBe(10);
    expect(component.isCounting()).toBeFalse();
    expect(component.isCompleted()).toBeFalse();
  });
});
