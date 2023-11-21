import { TestBed } from '@angular/core/testing';

import { ImagenCatalogoService } from './imagen-catalogo.service';

describe('ImagenCatalogoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ImagenCatalogoService = TestBed.get(ImagenCatalogoService);
    expect(service).toBeTruthy();
  });
});
