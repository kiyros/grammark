import { TestBed } from '@angular/core/testing';

import { EggcornService } from './eggcorns.service';

describe('EggcornServiceService', () => {
  let service: EggcornService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EggcornService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
