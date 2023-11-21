import { TestBed } from '@angular/core/testing';

import { TallaRegistroService } from './talla-registro.service';

describe('TallaRegistroService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TallaRegistroService = TestBed.get(TallaRegistroService);
    expect(service).toBeTruthy();
  });
});
