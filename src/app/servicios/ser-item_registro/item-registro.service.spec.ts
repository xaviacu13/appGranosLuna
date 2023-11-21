import { TestBed } from '@angular/core/testing';

import { ItemRegistroService } from './item-registro.service';

describe('ItemRegistroService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ItemRegistroService = TestBed.get(ItemRegistroService);
    expect(service).toBeTruthy();
  });
});
