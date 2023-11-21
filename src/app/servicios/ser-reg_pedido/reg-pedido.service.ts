import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { RegPedido } from '../../models/reg-pedido';
@Injectable({
  providedIn: 'root'
})
export class RegPedidoService {

  regPedidoList: AngularFireList<any>;
  selectedRegPedido: RegPedido = new RegPedido();

  constructor(private firebase: AngularFireDatabase) { }

  getRegPedido() {
    return this.regPedidoList = this.firebase.list('RegPedido');
  }
  insertRegPedido(regPedido: RegPedido) {

    this.regPedidoList.push({

      cliente: regPedido.cliente,
      sucursal: regPedido.sucursal,
      personal: regPedido.personal,
      costoTotal: regPedido.costoTotal,
      adelanto: regPedido.adelanto,
      saldo: regPedido.saldo,// = regPedido.costoTotal - regPedido.adelanto,
      fechaRegistro: regPedido.fechaPedido,
      fechaLimite: regPedido.fechaLimite || null,
      fechaEntrega: regPedido.fechaEntrega || null,
      estado: regPedido.estado || null,


    })
  }
  updateRegPedido(regPedido: RegPedido) {
    this.regPedidoList.update(regPedido.$key, {
      cliente: regPedido.cliente,
      sucursal: regPedido.sucursal,
      personal: regPedido.personal,
      costoTotal: regPedido.costoTotal,
      adelanto: regPedido.adelanto,
      saldo: regPedido.saldo,
      fechaRegistro: regPedido.fechaPedido,
      fechaLimite: regPedido.fechaLimite,
      fechaEntega: regPedido.fechaEntrega,
      estado: regPedido.estado,
    })
  }
  deleteRegPedido($key: string) {
    this.regPedidoList.remove($key);
  }
}

