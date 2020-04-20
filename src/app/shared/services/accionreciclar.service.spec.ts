import { TestBed } from '@angular/core/testing';

import { AccionreciclarService } from './accionreciclar.service';

describe('AccionreciclarService', () => {
  let service: AccionreciclarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccionreciclarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
