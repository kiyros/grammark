import { TestBed } from '@angular/core/testing';

import { TransitionsService } from './transitions.service';

describe('TransitionsServiceService', () => {
  let service: TransitionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransitionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
