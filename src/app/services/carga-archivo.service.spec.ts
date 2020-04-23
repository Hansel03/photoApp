import { TestBed } from '@angular/core/testing';

import { CargaArchivoService } from './carga-archivo.service';

describe('CargaArchivoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CargaArchivoService = TestBed.get(CargaArchivoService);
    expect(service).toBeTruthy();
  });
});
