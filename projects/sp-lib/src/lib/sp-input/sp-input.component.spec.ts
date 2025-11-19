import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpInputComponent } from './sp-input.component';

describe('SpInputComponent', () => {
  let component: SpInputComponent;
  let fixture: ComponentFixture<SpInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpInputComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SpInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
