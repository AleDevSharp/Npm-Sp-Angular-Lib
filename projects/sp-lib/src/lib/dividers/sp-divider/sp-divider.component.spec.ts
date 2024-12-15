import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpDividerComponent } from './sp-divider.component';

describe('SpDividerComponent', () => {
  let component: SpDividerComponent;
  let fixture: ComponentFixture<SpDividerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpDividerComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SpDividerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
