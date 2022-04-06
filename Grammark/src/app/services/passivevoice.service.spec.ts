import { TestBed } from '@angular/core/testing';

import { PassivevoiceService } from './passivevoice.service';

describe('PassivevoiceService', () => {
  let service: PassivevoiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PassivevoiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
