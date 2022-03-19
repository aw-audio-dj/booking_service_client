import { TestBed } from '@angular/core/testing';

import { GetTrainingsBetweenDatesService } from './get-trainings-between-dates.service';

describe('GetTrainingsBetweenDatesService', () => {
  let service: GetTrainingsBetweenDatesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetTrainingsBetweenDatesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
