import { TestBed } from '@angular/core/testing';

import { SpLibService } from './sp-lib.service';

describe('SpLibService', () => {
  let service: SpLibService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpLibService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
