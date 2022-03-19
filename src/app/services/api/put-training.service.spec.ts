import { TestBed } from '@angular/core/testing';

import { PutTrainingService } from './put-training.service';

describe('PutTrainingService', () => {
  let service: PutTrainingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PutTrainingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
