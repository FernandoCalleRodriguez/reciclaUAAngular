import { TestBed } from '@angular/core/testing';

import { TipoaccionService } from './tipoaccion.service';

describe('TipoaccionService', () => {
  let service: TipoaccionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoaccionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
