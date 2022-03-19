import { TestBed } from '@angular/core/testing';

import { GetTrainingsService } from './get-trainings.service';

describe('GetTrainingsService', () => {
  let service: GetTrainingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetTrainingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
