import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntregaPedidosComponent } from './entrega-pedidos.component';

describe('EntregaPedidosComponent', () => {
  let component: EntregaPedidosComponent;
  let fixture: ComponentFixture<EntregaPedidosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntregaPedidosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntregaPedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
