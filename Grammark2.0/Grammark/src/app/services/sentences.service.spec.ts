import { TestBed } from '@angular/core/testing';

import { SentencesService } from './sentences.service';

describe('SentencesService', () => {
  let service: SentencesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SentencesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
