import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpLibComponent } from './sp-lib.component';

describe('SpLibComponent', () => {
  let component: SpLibComponent;
  let fixture: ComponentFixture<SpLibComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpLibComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SpLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
