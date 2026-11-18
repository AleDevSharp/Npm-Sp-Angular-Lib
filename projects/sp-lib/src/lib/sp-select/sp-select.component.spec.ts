import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpSelectComponent } from './sp-select.component';

describe('SpSelectComponent', () => {
  let component: SpSelectComponent;
  let fixture: ComponentFixture<SpSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpSelectComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SpSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should clear a user selection when the bound value is reset', () => {
    const select = fixture.nativeElement.querySelector('select') as HTMLSelectElement;
    fixture.componentRef.setInput('options', [{ label: 'React', value: 'react' }]);
    fixture.detectChanges();

    select.value = 'react';
    select.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(component.displayValue()).toBe('react');

    fixture.componentRef.setInput('value', '');
    fixture.detectChanges();

    expect(component.displayValue()).toBe('');
    expect(select.value).toBe('');
    expect(select.options[0].selected).toBeTrue();
  });

  it('should clear a form value when ControlValueAccessor receives null', () => {
    fixture.componentRef.setInput('options', [{ label: 'React', value: 'react' }]);
    component.writeValue('react');
    fixture.detectChanges();
    expect((fixture.nativeElement.querySelector('select') as HTMLSelectElement).value).toBe('react');

    component.writeValue(null);
    fixture.detectChanges();

    expect(component.displayValue()).toBe('');
    expect((fixture.nativeElement.querySelector('select') as HTMLSelectElement).value).toBe('');
  });
});
