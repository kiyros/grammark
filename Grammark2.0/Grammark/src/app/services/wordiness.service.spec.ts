import { TestBed } from '@angular/core/testing';

import { WordinessService } from './wordiness.service';

describe('WordinessService', () => {
  let service: WordinessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WordinessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
