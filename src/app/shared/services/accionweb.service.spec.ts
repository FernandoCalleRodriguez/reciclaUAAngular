import { TestBed } from '@angular/core/testing';

import { AccionwebService } from './accionweb.service';

describe('AccionwebService', () => {
  let service: AccionwebService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccionwebService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
