import { TestBed } from '@angular/core/testing';

import { PutEventService } from './put-event.service';

describe('PutEventService', () => {
  let service: PutEventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PutEventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
