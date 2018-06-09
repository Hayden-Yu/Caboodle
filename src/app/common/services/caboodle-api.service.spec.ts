import { TestBed, inject } from '@angular/core/testing';

import { CaboodleApiService } from './caboodle-api.service';

describe('CaboodleApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CaboodleApiService]
    });
  });

  it('should be created', inject([CaboodleApiService], (service: CaboodleApiService) => {
    expect(service).toBeTruthy();
  }));
});
