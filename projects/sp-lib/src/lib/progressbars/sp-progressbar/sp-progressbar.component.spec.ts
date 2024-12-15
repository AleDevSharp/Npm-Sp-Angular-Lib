import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpProgressbarComponent } from './sp-progressbar.component';

describe('SpProgressbarComponent', () => {
  let component: SpProgressbarComponent;
  let fixture: ComponentFixture<SpProgressbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpProgressbarComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SpProgressbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
