import { TestBed } from '@angular/core/testing';

import { AcademicStyleService } from './academicstyle.service';

describe('AcademicStyleService', () => {
  let service: AcademicStyleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AcademicStyleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});