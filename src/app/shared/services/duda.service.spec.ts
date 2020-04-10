import { TestBed } from '@angular/core/testing';

import { DudaService } from './duda.service';

describe('DudaService', () => {
  let service: DudaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DudaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
