import { TestBed } from '@angular/core/testing';

import { GetReferrerService } from './get-referrer.service';

describe('GetReferrerService', () => {
  let service: GetReferrerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetReferrerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
