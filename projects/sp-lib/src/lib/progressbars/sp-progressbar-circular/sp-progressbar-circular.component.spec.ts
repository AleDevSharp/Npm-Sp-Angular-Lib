import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpProgressbarCircularComponent } from './sp-progressbar-circular.component';

describe('SpProgressbarCircularComponent', () => {
  let component: SpProgressbarCircularComponent;
  let fixture: ComponentFixture<SpProgressbarCircularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpProgressbarCircularComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SpProgressbarCircularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
