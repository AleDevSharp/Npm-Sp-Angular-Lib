import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpSwitchComponent } from './sp-switch.component';

describe('SpSwitchComponent', () => {
  let component: SpSwitchComponent;
  let fixture: ComponentFixture<SpSwitchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpSwitchComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SpSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
