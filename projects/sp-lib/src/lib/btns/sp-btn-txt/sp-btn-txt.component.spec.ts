import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpBtnTxtComponent } from './sp-btn-txt.component';

describe('SpBtnTxtComponent', () => {
  let component: SpBtnTxtComponent;
  let fixture: ComponentFixture<SpBtnTxtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpBtnTxtComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SpBtnTxtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
