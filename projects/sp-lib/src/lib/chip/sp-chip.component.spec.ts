// --------------------------------------------------------------
// Project: SpLib
// File name: sp-chip.component.spec.ts
// File description: Unit tests for SpChipComponent.
// Author: Alessio Giacché
// Date created: 11-11-2026
// License: MIT
// --------------------------------------------------------------

import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { SpChipComponent } from './sp-chip.component';

describe('SpChipComponent', () => {
  let component: SpChipComponent;
  let fixture: ComponentFixture<SpChipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpChipComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SpChipComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('label', 'Angular');
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render label text', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.sp-chip-label')?.textContent).toContain('Angular');
  });

  it('should emit chipClick when clickable and clicked', () => {
    spyOn(component.chipClick, 'emit');
    fixture.componentRef.setInput('clickable', true);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const chipElement = compiled.querySelector<HTMLElement>('.sp-chip')!;
    chipElement.click();

    expect(component.chipClick.emit).toHaveBeenCalled();
  });

  it('should emit remove and trigger exit animation on remove button click', fakeAsync(() => {
    spyOn(component.remove, 'emit');
    fixture.componentRef.setInput('removable', true);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const removeBtn = compiled.querySelector<HTMLButtonElement>('.sp-chip-remove')!;
    removeBtn.click();
    fixture.detectChanges();

    expect(component.remove.emit).not.toHaveBeenCalled();
    expect(component.isExiting()).toBeTrue();
    removeBtn.click();
    tick(219);
    expect(component.remove.emit).not.toHaveBeenCalled();
    tick(1);
    expect(component.remove.emit).toHaveBeenCalledTimes(1);
    fixture.detectChanges();

    expect(component.isRemoved()).toBeTrue();
    expect(compiled.querySelector('.sp-chip')).toBeNull();
  }));

  it('should handle keyboard activation and defer Delete removal until the animation ends', fakeAsync(() => {
    spyOn(component.remove, 'emit');
    spyOn(component.chipClick, 'emit');
    fixture.componentRef.setInput('removable', true);
    fixture.componentRef.setInput('clickable', true);
    fixture.detectChanges();
    const chip = fixture.nativeElement.querySelector('.sp-chip') as HTMLElement;
    chip.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    expect(component.chipClick.emit).toHaveBeenCalledTimes(1);
    chip.dispatchEvent(new KeyboardEvent('keydown', { key: 'Delete' }));
    expect(component.remove.emit).not.toHaveBeenCalled();
    tick(220);
    expect(component.remove.emit).toHaveBeenCalledTimes(1);
  }));

  it('should cancel pending removal when destroyed', fakeAsync(() => {
    spyOn(component.remove, 'emit');
    fixture.componentRef.setInput('removable', true);
    fixture.detectChanges();
    (fixture.nativeElement.querySelector('.sp-chip-remove') as HTMLButtonElement).click();
    fixture.destroy();
    tick(250);
    expect(component.remove.emit).not.toHaveBeenCalled();
  }));

  it('should not emit events when disabled', () => {
    spyOn(component.chipClick, 'emit');
    spyOn(component.remove, 'emit');

    fixture.componentRef.setInput('disabled', true);
    fixture.componentRef.setInput('clickable', true);
    fixture.componentRef.setInput('removable', true);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const chipElement = compiled.querySelector<HTMLElement>('.sp-chip')!;
    chipElement.click();

    expect(component.chipClick.emit).not.toHaveBeenCalled();
    expect(component.remove.emit).not.toHaveBeenCalled();
  });
});
