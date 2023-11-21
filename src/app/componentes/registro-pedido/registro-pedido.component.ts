import { Component, OnInit } from '@angular/core';

// servicio
import { RegPedidoService } from '../../servicios/ser-reg_pedido/reg-pedido.service'
import { RegPedido } from "../../models/reg-pedido";
import { ToastrService } from "ngx-toastr";
import { NgForm } from '@angular/forms';
import { AuthService } from '../../servicios/ser-auth/auth.service';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-registro-pedido',
  templateUrl: './registro-pedido.component.html',
  styleUrls: ['./registro-pedido.component.css']
})
export class RegistroPedidoComponent implements OnInit {
  regPedidoList: RegPedido[];
  constructor(
    private regPedidoService: RegPedidoService,
    private toastr: ToastrService,
    private authService: AuthService,
    private router: Router
  ) { }
  filterPost = '';
  onSubmit(proveedorForm: NgForm) {
    if (proveedorForm.value.$key == null) {
      this.regPedidoService.insertRegPedido(proveedorForm.value)
      this.toastr.success('Operacion Correcta', 'Realizado correctamente')
    }
    else {
      this.regPedidoService.updateRegPedido(proveedorForm.value);
      this.toastr.success('Operacion Correcta', 'Registro de Pedido modificado correctamente')
    }
    this.resetForm(proveedorForm);
    $('#exampleModalScrollable').modal('hide');
  }
  resetForm(proveedorForm?: NgForm) {
    if (proveedorForm != null)
      proveedorForm.reset();
    this.regPedidoService.selectedRegPedido = new RegPedido();
  }

  btnAddPedido: any;
  ngOnInit() {
    if (this.authService.correo === null || this.authService.correo === undefined) {
      this.router.navigate(['/autentificacion']);
    }

    this.regPedidoService.getRegPedido()
      .snapshotChanges()
      .subscribe(item => {
        this.regPedidoList = [];
        item.forEach(element => {
          let x = element.payload.toJSON();
          x["$key"] = element.key;
          this.regPedidoList.push(x as RegPedido);
        });
      });
      this.btnAddPedido = false;
  }
  onEdit(regPedido: RegPedido) {
    this.regPedidoService.selectedRegPedido = Object.assign({}, regPedido);
  }

  onDelete($key: string) {
    if (confirm('Esta seguro que desea eliminar?...')) {
      this.regPedidoService.deleteRegPedido($key);
      this.toastr.success('Operacion Correcta', 'Registro de Pedido eliminado correctamente')
    }

  }





}
