import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroPedidoListComponent } from './registro-pedido-list.component';

describe('RegistroPedidoListComponent', () => {
  let component: RegistroPedidoListComponent;
  let fixture: ComponentFixture<RegistroPedidoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroPedidoListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroPedidoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
