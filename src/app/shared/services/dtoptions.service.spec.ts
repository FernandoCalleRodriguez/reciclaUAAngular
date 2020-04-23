import { TestBed } from '@angular/core/testing';

import { DtoptionsService } from './dtoptions.service';

describe('DtoptionsService', () => {
  let service: DtoptionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DtoptionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
