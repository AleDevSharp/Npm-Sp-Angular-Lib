// --------------------------------------------------------------
// Project: SpLib
// File name: sp-tooltip.directive.spec.ts
// File description: Unit tests for SpTooltipDirective and SpTooltipComponent.
// Author: Alessio Giacché
// Date created: 11-11-2026
// License: MIT
// --------------------------------------------------------------

import { Component } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { SpTooltipDirective } from './sp-tooltip.directive';

@Component({
  standalone: true,
  imports: [SpTooltipDirective],
  template: `
    <button
      id="test-btn"
      [spTooltip]="'Informazione di test'"
      [spTooltipPosition]="position"
      [spTooltipDelay]="50">
      Hover me
    </button>
  `
})
class TestHostComponent {
  // The preferred tooltip position for placement regression tests
  public position: 'top' | 'bottom' | 'left' | 'right' = 'top';
}

describe('SpTooltipDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  afterEach(() => {
    // Clean up any remaining tooltips from document body
    const existing = document.querySelectorAll('sp-tooltip');
    existing.forEach((el) => el.remove());
  });

  it('should instantiate the host and directive', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should show tooltip on mouseenter after delay and hide on mouseleave', fakeAsync(() => {
    const btn = fixture.nativeElement.querySelector('#test-btn') as HTMLButtonElement;
    btn.dispatchEvent(new MouseEvent('mouseenter'));
    tick(60);

    const tooltipEl = document.querySelector('.sp-tooltip-panel');
    expect(tooltipEl).toBeTruthy();
    expect(tooltipEl?.textContent).toContain('Informazione di test');

    btn.dispatchEvent(new MouseEvent('mouseleave'));
    tick(10);
    const hiddenTooltip = document.querySelector('.sp-tooltip-panel');
    expect(hiddenTooltip).toBeFalsy();
  }));

  it('should dismiss tooltip on Escape key press', fakeAsync(() => {
    const btn = fixture.nativeElement.querySelector('#test-btn') as HTMLButtonElement;
    btn.dispatchEvent(new MouseEvent('mouseenter'));
    tick(60);

    expect(document.querySelector('.sp-tooltip-panel')).toBeTruthy();

    btn.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    tick(10);
    expect(document.querySelector('.sp-tooltip-panel')).toBeFalsy();
  }));
  for (const position of ['top', 'bottom', 'left', 'right'] as const) {
    it(
      'should anchor the rendered panel correctly on the ' + position + ' side',
      fakeAsync(() => {
        fixture.componentInstance.position = position;
        fixture.detectChanges();
        const button = fixture.nativeElement.querySelector('#test-btn') as HTMLButtonElement;
        spyOn(button, 'getBoundingClientRect').and.returnValue(new DOMRect(300, 200, 120, 36));

        button.dispatchEvent(new MouseEvent('mouseenter'));
        tick(60);

        const panel = document.querySelector('.sp-tooltip-panel') as HTMLElement;
        expect(panel.textContent).toContain('Informazione di test');
        const width = panel.offsetWidth;
        const height = panel.offsetHeight;
        const expectedLeft = position === 'left' ? 300 - width - 8 : position === 'right' ? 428 : 360 - width / 2;
        const expectedTop = position === 'top' ? 200 - height - 8 : position === 'bottom' ? 244 : 218 - height / 2;
        expect(parseFloat(panel.style.left)).toBe(Math.round(expectedLeft));
        expect(parseFloat(panel.style.top)).toBe(Math.round(expectedTop));
        expect(panel.classList.contains('pos-' + position)).toBeTrue();

        button.dispatchEvent(new MouseEvent('mouseleave'));
      })
    );
  }
});
