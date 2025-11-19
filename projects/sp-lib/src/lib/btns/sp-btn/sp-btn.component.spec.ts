import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpBtnComponent } from './sp-btn.component';

describe('SpBtnComponent', () => {
  let component: SpBtnComponent;
  let fixture: ComponentFixture<SpBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpBtnComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SpBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
