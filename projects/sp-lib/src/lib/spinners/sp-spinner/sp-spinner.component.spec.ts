import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpSpinnerComponent } from './sp-spinner.component';

describe('SpSpinnerComponent', () => {
  let component: SpSpinnerComponent;
  let fixture: ComponentFixture<SpSpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpSpinnerComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SpSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
