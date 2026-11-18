// --------------------------------------------------------------
// Project: SpLib
// File name: sp-toggle-list.component.spec.ts
// File description: Unit tests for SpToggleListComponent.
// Author: Alessio Giacché
// Date created: 11-11-2026
// License: MIT
// --------------------------------------------------------------

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SpToggleListComponent } from './sp-toggle-list.component';
import { SpToggleListOption } from './sp-toggle-list.types';

describe('SpToggleListComponent', () => {
  let component: SpToggleListComponent<string>;
  let fixture: ComponentFixture<SpToggleListComponent<string>>;

  const mockOptions: SpToggleListOption<string>[] = [
    {
      label: 'Starter Plan',
      value: 'starter',
      description: 'Ideal for small projects and hobbyists.',
      badge: 'Free'
    },
    {
      label: 'Pro Plan',
      value: 'pro',
      description: 'Advanced analytics, team collaboration, and priority support.',
      badge: 'Popular'
    },
    {
      label: 'Enterprise Plan',
      value: 'enterprise',
      description: 'Custom SLA, dedicated infrastructure, and 24/7 account manager.',
      disabled: true
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpToggleListComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SpToggleListComponent<string>);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('options', mockOptions);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render all option cards with title and description', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const cards = compiled.querySelectorAll('.sp-toggle-card');
    expect(cards.length).toBe(3);

    expect(cards[0].querySelector('.sp-toggle-label')?.textContent).toContain('Starter Plan');
    expect(cards[0].querySelector('.sp-toggle-description')?.textContent).toContain('small projects');
    expect(cards[0].querySelector('.sp-toggle-badge')?.textContent).toContain('Free');
  });

  it('should select single option when clicked', () => {
    spyOn(component.selectionChange, 'emit');

    const compiled = fixture.nativeElement as HTMLElement;
    const cards = compiled.querySelectorAll<HTMLElement>('.sp-toggle-card');

    cards[1].click();
    fixture.detectChanges();

    expect(component.value()).toBe('pro');
    expect(component.selectionChange.emit).toHaveBeenCalledWith('pro');
    expect(component.isSelected(mockOptions[1])).toBeTrue();
  });

  it('should not select a disabled card', () => {
    spyOn(component.selectionChange, 'emit');

    const compiled = fixture.nativeElement as HTMLElement;
    const cards = compiled.querySelectorAll<HTMLElement>('.sp-toggle-card');

    cards[2].click();
    fixture.detectChanges();

    expect(component.value()).toBeUndefined();
    expect(component.selectionChange.emit).not.toHaveBeenCalled();
  });

  it('should toggle multiple values in multiple mode', () => {
    fixture.componentRef.setInput('mode', 'multiple');
    component.value.set([]);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const cards = compiled.querySelectorAll<HTMLElement>('.sp-toggle-card');

    // Click first card
    cards[0].click();
    fixture.detectChanges();
    expect(component.value()).toEqual(['starter']);

    // Click second card
    cards[1].click();
    fixture.detectChanges();
    expect(component.value()).toEqual(['starter', 'pro']);

    // Unclick first card
    cards[0].click();
    fixture.detectChanges();
    expect(component.value()).toEqual(['pro']);
  });

  it('should toggle option using keyboard (Enter / Space)', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const cards = compiled.querySelectorAll<HTMLElement>('.sp-toggle-card');

    cards[0].dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    fixture.detectChanges();
    expect(component.value()).toBe('starter');

    cards[1].dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }));
    fixture.detectChanges();
    expect(component.value()).toBe('pro');
  });

  it('should support ControlValueAccessor writeValue', () => {
    component.writeValue('pro');
    fixture.detectChanges();

    expect(component.value()).toBe('pro');
    expect(component.isSelected(mockOptions[1])).toBeTrue();
  });

  it('should support ControlValueAccessor setDisabledState', () => {
    component.setDisabledState(true);
    fixture.detectChanges();

    expect(component.isFormsDisabled()).toBeTrue();
    expect(component.isControlDisabled()).toBeTrue();
  });
});
