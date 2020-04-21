import { TestBed } from '@angular/core/testing';

import { TipoContenedorService } from './tipo-contenedor.service';

describe('TipoContenedorService', () => {
  let service: TipoContenedorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoContenedorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
