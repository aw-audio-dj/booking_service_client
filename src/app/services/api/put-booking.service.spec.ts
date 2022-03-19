import { TestBed } from '@angular/core/testing';

import { PutBookingService } from './put-booking.service';

describe('PutBookingService', () => {
  let service: PutBookingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PutBookingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
