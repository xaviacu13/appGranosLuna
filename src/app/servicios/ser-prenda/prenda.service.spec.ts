import { TestBed } from '@angular/core/testing';

import { PrendaService } from './prenda.service';

describe('PrendaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PrendaService = TestBed.get(PrendaService);
    expect(service).toBeTruthy();
  });
});
