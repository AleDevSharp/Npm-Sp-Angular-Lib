import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DividersPageComponent } from './dividers-page.component';

describe('DividersPageComponent', () => {
  let component: DividersPageComponent;
  let fixture: ComponentFixture<DividersPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DividersPageComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(DividersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
