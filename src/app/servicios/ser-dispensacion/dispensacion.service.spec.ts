import { TestBed } from '@angular/core/testing';

import { DispensacionService } from './dispensacion.service';

describe('DispensacionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DispensacionService = TestBed.get(DispensacionService);
    expect(service).toBeTruthy();
  });
});
