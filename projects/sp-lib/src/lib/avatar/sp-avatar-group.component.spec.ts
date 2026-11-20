// --------------------------------------------------------------
// Project: SpLib
// File name: sp-avatar-group.component.spec.ts
// File description: Unit tests for SpAvatarGroupComponent.
// Author: Alessio Giacché
// Date created: 11-11-2026
// License: MIT
// --------------------------------------------------------------

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpAvatarItem } from './sp-avatar.types';
import { SpAvatarGroupComponent } from './sp-avatar-group.component';

describe('SpAvatarGroupComponent', () => {
  let component: SpAvatarGroupComponent;
  let fixture: ComponentFixture<SpAvatarGroupComponent>;

  const mockItems: SpAvatarItem[] = [
    { name: 'Alessio Giacché', status: 'online' },
    { name: 'Giulia Bianchi', status: 'away' },
    { name: 'Marco Verdi', status: 'busy' },
    { name: 'Sara Neri', status: 'offline' },
    { name: 'Luca Rossi' },
    { name: 'Elena Esposito' }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpAvatarGroupComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SpAvatarGroupComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('items', mockItems);
    fixture.componentRef.setInput('max', 3);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render only max number of visible avatars', () => {
    expect(component.visibleItems().length).toBe(3);
    const compiled = fixture.nativeElement as HTMLElement;
    const avatars = compiled.querySelectorAll('sp-avatar');
    expect(avatars.length).toBe(3);
  });

  it('should display excess counter when total exceeds max', () => {
    expect(component.excessCount()).toBe(3);
    const compiled = fixture.nativeElement as HTMLElement;
    const excessEl = compiled.querySelector('.sp-avatar-excess-text');
    expect(excessEl?.textContent?.trim()).toBe('+3');
  });

  it('should not display excess counter when items count is within max', () => {
    fixture.componentRef.setInput('max', 10);
    fixture.detectChanges();

    expect(component.excessCount()).toBe(0);
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.sp-avatar-excess')).toBeNull();
  });
});
