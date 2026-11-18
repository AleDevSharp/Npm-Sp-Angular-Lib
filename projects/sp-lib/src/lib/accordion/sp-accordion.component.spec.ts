// --------------------------------------------------------------
// Project: SpLib
// File name: sp-accordion.component.spec.ts
// File description: Unit tests for SpAccordionComponent and SpAccordionItemComponent.
// Author: Alessio Giacché
// Date created: 11-11-2026
// License: MIT
// --------------------------------------------------------------

import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SpAccordionItemComponent } from './sp-accordion-item.component';
import { SpAccordionComponent } from './sp-accordion.component';

@Component({
  standalone: true,
  imports: [SpAccordionComponent, SpAccordionItemComponent],
  template: `
    <sp-accordion [multi]="multi">
      <sp-accordion-item #item1 title="Panel 1">
        Content 1
      </sp-accordion-item>
      <sp-accordion-item #item2 title="Panel 2">
        Content 2
      </sp-accordion-item>
      <sp-accordion-item #item3 title="Panel 3" [disabled]="true">
        Content 3
      </sp-accordion-item>
    </sp-accordion>
  `
})
class TestAccordionHostComponent {
  public multi = false;
}

describe('SpAccordionComponent', () => {
  let fixture: ComponentFixture<TestAccordionHostComponent>;
  let hostComponent: TestAccordionHostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestAccordionHostComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestAccordionHostComponent);
    hostComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the accordion host', () => {
    expect(hostComponent).toBeTruthy();
  });

  it('should expand an item when header button is clicked', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const headerButtons = compiled.querySelectorAll<HTMLButtonElement>('.sp-accordion-header');

    expect(headerButtons.length).toBe(3);

    // Click first item
    headerButtons[0].click();
    fixture.detectChanges();

    const items = compiled.querySelectorAll('.sp-accordion-item');
    expect(items[0].classList.contains('sp-accordion-item--expanded')).toBeTrue();
    expect(items[0].querySelector('.sp-accordion-collapse')?.classList.contains('sp-accordion-collapse--open')).toBeTrue();
  });

  it('should close previously opened panel when multi is false', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const headerButtons = compiled.querySelectorAll<HTMLButtonElement>('.sp-accordion-header');
    const items = compiled.querySelectorAll('.sp-accordion-item');

    // Open first panel
    headerButtons[0].click();
    fixture.detectChanges();
    expect(items[0].classList.contains('sp-accordion-item--expanded')).toBeTrue();

    // Open second panel
    headerButtons[1].click();
    fixture.detectChanges();

    // First panel should now be closed, second should be open
    expect(items[0].classList.contains('sp-accordion-item--expanded')).toBeFalse();
    expect(items[1].classList.contains('sp-accordion-item--expanded')).toBeTrue();
  });

  it('should allow multiple panels open when multi is true', () => {
    hostComponent.multi = true;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const headerButtons = compiled.querySelectorAll<HTMLButtonElement>('.sp-accordion-header');
    const items = compiled.querySelectorAll('.sp-accordion-item');

    headerButtons[0].click();
    fixture.detectChanges();

    headerButtons[1].click();
    fixture.detectChanges();

    expect(items[0].classList.contains('sp-accordion-item--expanded')).toBeTrue();
    expect(items[1].classList.contains('sp-accordion-item--expanded')).toBeTrue();
  });

  it('should not toggle disabled item', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const headerButtons = compiled.querySelectorAll<HTMLButtonElement>('.sp-accordion-header');
    const items = compiled.querySelectorAll('.sp-accordion-item');

    // Click third item which is disabled
    headerButtons[2].click();
    fixture.detectChanges();

    expect(items[2].classList.contains('sp-accordion-item--expanded')).toBeFalse();
  });
});
