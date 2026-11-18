// --------------------------------------------------------------
// Project: SpLib
// File name: sp-card.component.spec.ts
// File description: Unit tests for SpCardComponent and its composable sub-elements.
// Author: Alessio Giacché
// Date created: 11-11-2026
// License: MIT
// --------------------------------------------------------------

import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpCardComponent } from './sp-card.component';
import { SpCardActionsComponent } from './sp-card-actions.component';
import { SpCardContentComponent } from './sp-card-content.component';
import { SpCardFooterComponent } from './sp-card-footer.component';
import { SpCardHeaderComponent } from './sp-card-header.component';
import { SpCardMediaComponent } from './sp-card-media.component';

@Component({
  standalone: true,
  imports: [
    SpCardComponent,
    SpCardHeaderComponent,
    SpCardMediaComponent,
    SpCardContentComponent,
    SpCardActionsComponent,
    SpCardFooterComponent
  ],
  template: `
    <sp-card
      [variant]="'glass'"
      [interactive]="true"
      [clickable]="true"
      (cardClick)="onCardClicked()">
      <sp-card-media [src]="'https://via.placeholder.com/400x200'" [aspectRatio]="'16:9'"></sp-card-media>
      <sp-card-header title="Test Card" subtitle="Test Subtitle"></sp-card-header>
      <sp-card-content>Test content body</sp-card-content>
      <sp-card-actions align="end">
        <button id="action-btn">Action</button>
      </sp-card-actions>
      <sp-card-footer>Footer info</sp-card-footer>
    </sp-card>
  `
})
class TestCardHostComponent {
  public clicked = false;
  public onCardClicked(): void {
    this.clicked = true;
  }
}

describe('SpCardComponent', () => {
  let fixture: ComponentFixture<TestCardHostComponent>;
  let component: TestCardHostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestCardHostComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestCardHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the card host and render all subcomponents', () => {
    expect(component).toBeTruthy();
    const cardEl = fixture.nativeElement.querySelector('.sp-card-box');
    expect(cardEl).toBeTruthy();
    expect(cardEl.classList).toContain('variant-glass');
    expect(cardEl.classList).toContain('is-interactive');
    expect(cardEl.classList).toContain('is-clickable');
  });

  it('should render title and subtitle in header', () => {
    const titleEl = fixture.nativeElement.querySelector('.sp-card-title');
    const subtitleEl = fixture.nativeElement.querySelector('.sp-card-subtitle');
    expect(titleEl?.textContent).toContain('Test Card');
    expect(subtitleEl?.textContent).toContain('Test Subtitle');
  });

  it('should emit cardClick when clickable card is clicked', () => {
    const cardEl = fixture.nativeElement.querySelector('.sp-card-box');
    cardEl.click();
    expect(component.clicked).toBeTrue();
  });

  it('should trigger click on Enter keydown', () => {
    component.clicked = false;
    const cardEl = fixture.nativeElement.querySelector('.sp-card-box');
    cardEl.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    expect(component.clicked).toBeTrue();
  });
});
