import { Component, OnInit } from '@angular/core';
// servicio
import { RegPedidoService } from '../../servicios/ser-reg_pedido/reg-pedido.service'
import { RegPedido } from "../../models/reg-pedido";
import { ToastrService } from "ngx-toastr";
import { NgForm } from '@angular/forms';
import { AngularFireDatabase } from 'angularfire2/database';
import { Cliente } from 'src/app/models/cliente';
import { Personal } from "../../models/personal";
import { Sucursal } from "../../models/sucursal";
import { ClienteService } from "../../servicios/ser-cliente/cliente.service"
import { exists } from 'fs';
import * as firebase from 'firebase/app';
import { ItemRegistroService } from '../../servicios/ser-item_registro/item-registro.service';
import { ProveedorService } from '../../servicios/ser-proveedor/proveedor.service';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from 'angularfire2/storage';
import { ItemRegistro } from '../../models/item-registro';
import { AuthService } from '../../servicios/ser-auth/auth.service';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
declare var $: any;


@Component({
  selector: 'app-registro-pedido-list',
  templateUrl: './registro-pedido-list.component.html',
  styleUrls: ['./registro-pedido-list.component.css']
})
export class RegistroPedidoListComponent implements OnInit {
  regPedidoList: RegPedido[];
  nombre: any;
  ciCliente: any;
  uploadPercent: Observable<number>;
  urlImage: Observable<string>;
  nombreFoto1: any;
  file: any;
  filePath: any;
  selectedImage: any;
  ref: any;
  img: any;
  imgSrc: any;

  nombrePersonal: any;
  itemRegistroList: ItemRegistro[];
  costoTotal: any = 0;
  detallePedido: {
    idRegistro: any,
    // prenda: any,
    // cantidad: any,
    // costoUnitario: any,
    // costoTotal: any,
    // modelo: any,
    // color: any
  }[];

  constructor(
    private regPedidoService: RegPedidoService,
    private toastr: ToastrService,
    private clienteService: ClienteService,
    private itemRegistro: ItemRegistroService,
    public db: AngularFireDatabase,
    private itemRegistroService: ItemRegistroService,
    private storage: AngularFireStorage,
    private authService: AuthService,
    private router: Router

  ) {


    db.list('cliente').snapshotChanges().subscribe(item => {
      this.ciCliente = [];
      item.forEach(element => {
        let x = element.payload.toJSON()
        x["$key"] = element.key;
        this.ciCliente.push(x as Cliente)
      });
    });




    db.list('Sucursal').snapshotChanges().subscribe(item => {
      this.nombre = [];
      item.forEach(element => {
        let x = element.payload.toJSON()
        x["$key"] = element.key
        this.nombre.push(x as Sucursal)

      });
    });


    db.list('Personal').snapshotChanges().subscribe(item => {
      this.nombrePersonal = [];
      item.forEach(element => {
        let x = element.payload.toJSON()
        x["$key"] = element.key
        this.nombrePersonal.push(x as Personal)

      })
    })

  }
  filterPost = '';

  ct: any = 0;
  nameClient
  apellidosClient
  ciClient
  datosCliente(ciCliente) {
    this.ct = 0;
    let ref = firebase.database().ref('cliente')
    ref.orderByChild('ci').equalTo(ciCliente).once("child_added", snap => {
      this.nameClient = snap.val().nombre
      this.apellidosClient = snap.val().apellido
      this.ciClient = snap.val().ci
    })

    if (this.ciClient != null || this.ciClient != undefined) {
      this.itemRegistroService.getItemRegistro();

      if (this.ciClient != null || this.ciClient != undefined) {

        this.itemRegistroService.getItemRegistro()
          .snapshotChanges()
          .subscribe(item => {
            this.itemRegistroList = [];
            item.forEach(element => {
              let x = element.payload.toJSON();
              x["$key"] = element.key;
              if (x["idRegistro"] === this.ciClient) {
                this.itemRegistroList.push({
                  $key: '',
                  idRegistro: x["idRegistro"],
                  prenda: x["prenda"],
                  cantidad: x["cantidad"],
                  costoUnitario: x["costoUnitario"],
                  costoTotal: x["costoTotal"],
                  modelo: x["modelo"],
                  color: x["color"],
                })
              }
            });
          });
      }

      let r = firebase.database().ref('itemRegistro');
      r.orderByChild('idRegistro').equalTo(this.ciClient).on('child_added', snap => {

        this.ct = this.ct + snap.val().costoTotal;
      })
      // this.hola = i.val().color;

      /* LIMPIAR INPUT ADELANTO Y SALDO*/
      // if(document.getElementById('saldo').innerHTML != null || document.getElementById('saldo').innerHTML != undefined){
      // document.getElementById('saldo').innerHTML = '';
      // document.getElementById('adelanto').innerHTML = '';
      // }

    }
  }


  BucarPersonal() {
    const nombre: string = (document.getElementById('ciCliente') as HTMLInputElement).value;
    const ref = firebase.database().ref('cliente')
    ref.orderByChild('nombre').equalTo(nombre).on("child_added", snap => {
      //  console.log('existe');
    });

  }
  onSubmit(proveedorForm: NgForm) {
    proveedorForm.value.costoTotal = (document.getElementById('costoTotal') as HTMLInputElement).value;
    this.regPedidoService.selectedRegPedido.costoTotal = (document.getElementById('costoTotal') as HTMLInputElement).value;
    // console.log(proveedorForm.value.costoTotal);

    proveedorForm.value.saldo = (document.getElementById('saldo') as HTMLInputElement).value;
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

  suma: any;
  ngOnInit() {
    if(this.authService.correo === null  || this.authService.correo === undefined){
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

    this.itemRegistroService.getItemRegistro();

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

  saldoPagar
  valorAdelanto(valorAdelanto) {
    this.saldoPagar = parseInt((document.getElementById('costoTotal') as HTMLInputElement).value) - valorAdelanto.target.value;
  }

  onSubmitPedido(itemRegistroForm: NgForm) {


    this.img = (document.getElementById('urlImageValue') as HTMLInputElement).value;

    if (itemRegistroForm.value.$key == null) {
      itemRegistroForm.value.idRegistro = (document.getElementById('idRegistro') as HTMLInputElement).value;
      this.itemRegistroService.selectedItemRegistro.idRegistro = itemRegistroForm.value.idRegistro;

      itemRegistroForm.value.modelo = this.img;
      this.itemRegistroService.selectedItemRegistro.modelo = itemRegistroForm.value.modelo;

      itemRegistroForm.value.costoTotal = itemRegistroForm.value.cantidad * itemRegistroForm.value.costoUnitario;
      this.itemRegistroService.selectedItemRegistro.costoTotal = itemRegistroForm.value.costoTotal;
      this.itemRegistroService.insertItemRegistro(itemRegistroForm.value)
      this.toastr.success('Operacion Correcta', 'Item Pedido registrdo correctamente')
    }
    else {
      this.itemRegistroService.updateItemRegistro(itemRegistroForm.value);
      this.toastr.success('Operacion Correcta', 'Item Pedido modificado correctamente')
    }
    this.resetForm(itemRegistroForm);
    $('#exampleModalScrollable').modal('hide');
  }

  uploadFile1(event: any) {
    // limpiamos la muestra de la imagen pequeña
    this.imgSrc = '';
    // nombre aleatorio para la imagen
    const id = Math.random().toString(36).substring(2);
    this.file = event.target.files[0];
    this.filePath = 'Upload/regPedido/regPedido_' + id;
    this.ref = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath, this.file);
    this.uploadPercent = task.percentageChanges();
    task.snapshotChanges().pipe(finalize(() => this.urlImage = this.ref.getDownloadURL())).subscribe();
    // cargar muestra de imagen pequeña
    const reader = new FileReader();
    reader.onload = (e: any) => this.imgSrc = e.target.result;
    reader.readAsDataURL(event.target.files[0]);
    this.selectedImage = event.target.files[0];
  }





}
