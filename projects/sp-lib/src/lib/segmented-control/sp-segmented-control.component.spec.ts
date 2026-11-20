// --------------------------------------------------------------
// Project: SpLib
// File name: sp-segmented-control.component.spec.ts
// File description: Unit tests for SpSegmentedControlComponent.
// Author: Alessio Giacché
// Date created: 11-11-2026
// License: MIT
// --------------------------------------------------------------

import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { SpSegmentedControlComponent } from './sp-segmented-control.component';
import { SpSegmentedControlOption } from './sp-segmented-control.types';

describe('SpSegmentedControlComponent', () => {
  let component: SpSegmentedControlComponent<string>;
  let fixture: ComponentFixture<SpSegmentedControlComponent<string>>;

  const mockOptions: SpSegmentedControlOption<string>[] = [
    { label: 'Day', value: 'day' },
    { label: 'Week', value: 'week' },
    { label: 'Month', value: 'month', disabled: true },
    { label: 'Year', value: 'year' }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpSegmentedControlComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SpSegmentedControlComponent<string>);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('options', mockOptions);
    component.value.set('day');
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render all options', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const buttons = compiled.querySelectorAll('.sp-segmented-option');
    expect(buttons.length).toBe(4);
    expect(buttons[0].textContent).toContain('Day');
    expect(buttons[1].textContent).toContain('Week');
  });

  it('should select an option when clicked', fakeAsync(() => {
    spyOn(component.selectionChange, 'emit');

    const compiled = fixture.nativeElement as HTMLElement;
    const buttons = compiled.querySelectorAll<HTMLButtonElement>('.sp-segmented-option');

    buttons[1].click();
    tick();
    fixture.detectChanges();

    expect(component.value()).toBe('week');
    expect(component.selectionChange.emit).toHaveBeenCalledWith('week');
  }));

  it('should not select a disabled option', fakeAsync(() => {
    spyOn(component.selectionChange, 'emit');

    const compiled = fixture.nativeElement as HTMLElement;
    const buttons = compiled.querySelectorAll<HTMLButtonElement>('.sp-segmented-option');

    // Button at index 2 is disabled
    buttons[2].click();
    tick();
    fixture.detectChanges();

    expect(component.value()).toBe('day');
    expect(component.selectionChange.emit).not.toHaveBeenCalled();
  }));

  it('should support keyboard navigation skipping disabled options', fakeAsync(() => {
    const compiled = fixture.nativeElement as HTMLElement;
    const container = compiled.querySelector<HTMLElement>('.sp-segmented-container')!;

    // Current is 'day' (index 0). ArrowRight should skip index 2 ('month') and go to index 1 ('week')
    container.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
    tick();
    fixture.detectChanges();
    expect(component.value()).toBe('week');

    // ArrowRight again: next is index 2 which is disabled, so it should go to index 3 ('year')
    container.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
    tick();
    fixture.detectChanges();
    expect(component.value()).toBe('year');
  }));

  it('should update value via ControlValueAccessor writeValue', fakeAsync(() => {
    component.writeValue('year');
    tick();
    fixture.detectChanges();

    expect(component.value()).toBe('year');
  }));

  it('should update disabled state via ControlValueAccessor setDisabledState', () => {
    component.setDisabledState(true);
    fixture.detectChanges();

    expect(component.isFormsDisabled()).toBeTrue();
    expect(component.isControlDisabled()).toBeTrue();
  });
});
