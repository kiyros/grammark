import { TestBed } from '@angular/core/testing';

import { NominalizationsService } from './nominalizations.service';

describe('NominalizationsService', () => {
  let service: NominalizationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NominalizationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
