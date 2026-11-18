// --------------------------------------------------------------
// Project: SpLib
// File name: sp-speed-dial.component.spec.ts
// File description: Unit tests for SpSpeedDialComponent verifying states, interactions and animations.
// Author: Alessio Giacché
// Date created: 11-11-2026
// License: MIT
// --------------------------------------------------------------

import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { SpSpeedDialComponent } from './sp-speed-dial.component';
import { SpSpeedDialItem } from './sp-speed-dial.types';

describe('SpSpeedDialComponent', () => {
  let component: SpSpeedDialComponent;
  let fixture: ComponentFixture<SpSpeedDialComponent>;

  const mockItems: SpSpeedDialItem[] = [
    { id: '1', label: 'Edit', icon: '✎' },
    { id: '2', label: 'Share', icon: '🔗' },
    { id: '3', label: 'Delete', icon: '🗑', disabled: true }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpSpeedDialComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SpSpeedDialComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('items', mockItems);
    fixture.detectChanges();
  });

  it('should create the component instance', () => {
    expect(component).toBeTruthy();
    expect(component.opened()).toBeFalse();
  });

  it('should toggle opened state via trigger click', () => {
    const triggerBtn = fixture.nativeElement.querySelector('.sp-speed-dial-trigger-btn');
    expect(triggerBtn).toBeTruthy();

    triggerBtn.click();
    fixture.detectChanges();
    expect(component.opened()).toBeTrue();

    triggerBtn.click();
    fixture.detectChanges();
    expect(component.opened()).toBeFalse();
  });

  it('should emit onOpen and onClose events', () => {
    spyOn(component.onOpen, 'emit');
    spyOn(component.onClose, 'emit');

    component.open();
    expect(component.opened()).toBeTrue();
    expect(component.onOpen.emit).toHaveBeenCalledTimes(1);

    component.close();
    expect(component.opened()).toBeFalse();
    expect(component.onClose.emit).toHaveBeenCalledTimes(1);
  });

  it('should not open when disabled', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    component.open();
    expect(component.opened()).toBeFalse();

    component.toggle();
    expect(component.opened()).toBeFalse();
  });

  it('should emit itemClick and execute command when an action item is clicked', () => {
    let commandExecuted = false;
    const testItems: SpSpeedDialItem[] = [
      {
        id: 'test-1',
        label: 'Action 1',
        command: () => {
          commandExecuted = true;
        }
      }
    ];

    fixture.componentRef.setInput('items', testItems);
    component.open();
    fixture.detectChanges();

    spyOn(component.itemClick, 'emit');

    const actionBtn = fixture.nativeElement.querySelector('.sp-speed-dial-action-btn');
    expect(actionBtn).toBeTruthy();
    actionBtn.click();
    fixture.detectChanges();

    expect(commandExecuted).toBeTrue();
    expect(component.itemClick.emit).toHaveBeenCalledWith(testItems[0]);
    expect(component.opened()).toBeFalse(); // Auto-closes by default
  });

  it('should not trigger action when item is disabled', () => {
    let commandExecuted = false;
    const testItems: SpSpeedDialItem[] = [
      {
        id: 'disabled-item',
        label: 'Disabled',
        disabled: true,
        command: () => {
          commandExecuted = true;
        }
      }
    ];

    fixture.componentRef.setInput('items', testItems);
    component.open();
    fixture.detectChanges();

    const actionBtn = fixture.nativeElement.querySelector('.sp-speed-dial-action-btn');
    actionBtn.click();
    fixture.detectChanges();

    expect(commandExecuted).toBeFalse();
  });

  it('should close on Escape keydown', () => {
    component.open();
    fixture.detectChanges();
    expect(component.opened()).toBeTrue();

    const event = new KeyboardEvent('keydown', { key: 'Escape' });
    component.handleEscape(event);
    expect(component.opened()).toBeFalse();
  });

  it('should support hover trigger when configured', fakeAsync(() => {
    fixture.componentRef.setInput('trigger', 'hover');
    fixture.detectChanges();

    component.handleMouseEnter();
    expect(component.opened()).toBeTrue();

    component.handleMouseLeave();
    tick(100);
    component.handleMouseEnter();
    tick(150);
    expect(component.opened()).toBeTrue();
    component.handleMouseLeave();
    tick(200);
    expect(component.opened()).toBeFalse();
  }));

  it('should render backdrop when enabled and close on backdrop click', () => {
    fixture.componentRef.setInput('backdrop', true);
    component.open();
    fixture.detectChanges();

    const backdrop = fixture.nativeElement.querySelector('.sp-speed-dial-backdrop');
    expect(backdrop).toBeTruthy();

    backdrop.click();
    fixture.detectChanges();
    expect(component.opened()).toBeFalse();
  });

  it('should compute radial coordinates for semi-circle and quarter-circle', () => {
    fixture.componentRef.setInput('type', 'semi-circle');
    fixture.detectChanges();

    const style = component.getItemStyle(0, 3);
    expect(style['--item-tx']).toBeDefined();
    expect(style['--item-ty']).toBeDefined();
  });
  it('should preserve size and direction classes and exclude closed actions from tab order', () => {
    fixture.componentRef.setInput('size', 'lg');
    fixture.componentRef.setInput('direction', 'right');
    fixture.detectChanges();
    const root = fixture.nativeElement.querySelector('.sp-speed-dial');
    expect(root.classList.contains('sp-speed-dial-size-lg')).toBeTrue();
    expect(root.classList.contains('sp-speed-dial-right')).toBeTrue();
    const buttons = fixture.nativeElement.querySelectorAll('.sp-speed-dial-action-btn');
    expect(Array.from(buttons).every((button: any) => button.tabIndex === -1)).toBeTrue();
    component.open(); fixture.detectChanges();
    expect(buttons[0].tabIndex).toBe(0);
    expect(buttons[2].tabIndex).toBe(-1);
  });

  it('should center a single radial action on its configured direction', () => {
    fixture.componentRef.setInput('type', 'quarter-circle');
    fixture.componentRef.setInput('direction', 'left');
    fixture.detectChanges();
    const style = component.getItemStyle(0, 1);
    expect(style['--item-tx']).toBe('-85px');
    expect(style['--item-ty']).toBe('0px');
  });
});
