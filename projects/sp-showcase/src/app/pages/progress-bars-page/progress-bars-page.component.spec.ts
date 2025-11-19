import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressBarsPageComponent } from './progress-bars-page.component';

describe('ProgressBarsPageComponent', () => {
  let component: ProgressBarsPageComponent;
  let fixture: ComponentFixture<ProgressBarsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgressBarsPageComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ProgressBarsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
