import { TestBed } from '@angular/core/testing';

import { RegPedidoService } from './reg-pedido.service';

describe('RegPedidoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RegPedidoService = TestBed.get(RegPedidoService);
    expect(service).toBeTruthy();
  });
});
