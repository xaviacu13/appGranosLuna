import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { RegPedido } from '../../models/reg-pedido';
import * as firebase from 'firebase/app';
import { Personal } from '../../models/personal';
import { Sucursal } from '../../models/sucursal';
import { Cliente } from '../../models/cliente';
import { AngularFireStorage } from 'angularfire2/storage';
import { ItemRegistroService } from '../../servicios/ser-item_registro/item-registro.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { ClienteService } from '../../servicios/ser-cliente/cliente.service';
import { ToastrService } from 'ngx-toastr';
import { RegPedidoService } from '../../servicios/ser-reg_pedido/reg-pedido.service';
import { ItemRegistro } from '../../models/item-registro';
import { Observable } from 'rxjs';
import { CajaService } from '../../servicios/ser-caja/caja.service';
import { Caja } from '../../models/caja';
declare var $: any;
@Component({
  selector: 'app-entrega-pedidos',
  templateUrl: './entrega-pedidos.component.html',
  styleUrls: ['./entrega-pedidos.component.css']
})
export class EntregaPedidosComponent implements OnInit {

  fechaPedido: any;
  fechaLimite: any;
  adelanto: any;
  saldoPagar: any;

  regPedidoList: RegPedido[];
  cajaList: Caja[];

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
    private cajaservice: CajaService
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
    this.fechaPedido = '';
    this.fechaLimite = '';
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

        setTimeout(()=>{ this.ct = this.ct + snap.val().costoTotal;})
      })
      let refPedido = firebase.database().ref('RegPedido');
      refPedido.orderByChild('cliente').equalTo(this.ciClient).on('child_added', snap => {
        setTimeout(()=>{
        this.fechaPedido = snap.val().fechaRegistro;
        this.fechaLimite = snap.val().fechaLimite;
        this.adelanto = snap.val().adelanto;
        this.saldoPagar = snap.val().saldo;
        },1000);
      })

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
    // proveedorForm.value.estado = 'Recibido';
    let refPedido = firebase.database().ref('RegPedido');
    let refPedido2 = firebase.database().ref('RegPedido');
    let key;
    let cliente;
    let sucursal;
    let personal;
    let costoTotal;
    let adelanto;
    let saldo;
    let fechaPedido;
    let fechaLimite;
    let fechaEntrega;
    let estado;
    let data;

    let fecha = proveedorForm.value.fechaEntregado;
    let glosa = 'Por Entrega';
    let entradaCaja = (document.getElementById('ingresarSaldo') as HTMLInputElement).value;
    let salidaCaja = '';
    let personalCaja = this.nameClient;


    refPedido.orderByChild('cliente').equalTo(this.ciClient).once("value", snap => {
      key = Object.keys(snap.val())[0].toString();
      refPedido2.orderByKey().equalTo(key).once("child_added", snapshot => {
        
        cliente = snapshot.val().cliente;
        sucursal = snapshot.val().sucursal;
        personal = snapshot.val().personal;
        costoTotal = snapshot.val().costoTotal;
        adelanto = snapshot.val().adelanto;
        saldo = snapshot.val().saldo;
        fechaPedido = snapshot.val().fechaRegistro;
        fechaLimite = snapshot.val().fechaLimite;
        fechaEntrega = proveedorForm.value.fechaEntregado;
        estado = 'Recibido';

        data = { cliente, sucursal, personal, costoTotal, adelanto, saldo, fechaPedido, fechaLimite, fechaEntrega, estado };
      })
    })
    this.cajaservice.insertCaja(null, fecha, glosa, entradaCaja, salidaCaja, personal);
    setTimeout(() => { firebase.database().ref().child('RegPedido/' + key).update(data);},1000);
    // console.log(proveedorForm.value);

    // proveedorForm.value.costoTotal = (document.getElementById('costoTotal') as HTMLInputElement).value;
    // this.regPedidoService.selectedRegPedido.costoTotal = (document.getElementById('costoTotal') as HTMLInputElement).value;
    // // console.log(proveedorForm.value.costoTotal);

    // proveedorForm.value.saldo = (document.getElementById('saldo') as HTMLInputElement).value;
    // if (proveedorForm.value.$key == null) {
    //   this.regPedidoService.insertRegPedido(proveedorForm.value)
    //   this.toastr.success('Operacion Correcta', 'Realizado correctamente')
    // }
    // else {
    //   this.regPedidoService.updateRegPedido(proveedorForm.value);
    //   this.toastr.success('Operacion Correcta', 'Registro de Pedido modificado correctamente')
    // }
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

    this.cajaservice.getCaja();
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

  // saldoPagar
  // valorAdelanto(valorAdelanto) {
  //   this.saldoPagar = parseInt((document.getElementById('costoTotal') as HTMLInputElement).value) - valorAdelanto.target.value;
  // }

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
