import { TestBed } from '@angular/core/testing';

import { GetEventsOfTrainingService } from './get-events-of-training.service';

describe('GetEventsOfTrainingsService', () => {
  let service: GetEventsOfTrainingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetEventsOfTrainingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
