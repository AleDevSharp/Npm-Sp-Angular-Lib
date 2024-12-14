import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SSpinnerComponent } from './s-spinner.component';

describe('SSpinnerComponent', () => {
  let component: SSpinnerComponent;
  let fixture: ComponentFixture<SSpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SSpinnerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
