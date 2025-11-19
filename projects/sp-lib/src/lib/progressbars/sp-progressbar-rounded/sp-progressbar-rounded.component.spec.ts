import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpProgressbarRoundedComponent } from './sp-progressbar-rounded.component';

describe('SpProgressbarRoundedComponent', () => {
  let component: SpProgressbarRoundedComponent;
  let fixture: ComponentFixture<SpProgressbarRoundedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpProgressbarRoundedComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SpProgressbarRoundedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
