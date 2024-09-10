import { Component, OnInit } from '@angular/core';
import { CompraService } from '../../servicios/ser-compra/compra.service';
import { Compra } from "../../models/compra";
import { ToastrService } from "ngx-toastr"
import { InsumoService } from '../../servicios/ser-insumo/insumo.service';
import { Insumo } from "../../models/insumo";
import { NgForm } from '@angular/forms';
import { AngularFireDatabase } from 'angularfire2/database';
import { element } from 'protractor';
import { Proveedor } from 'src/app/models/proveedor';
import { Personal } from 'src/app/models/personal';
import { AlmacenService } from '../../servicios/ser-almacen/almacen.service';
import * as firebase from 'firebase/app';
import { Almacen } from '../../models/almacen';
import { Caja } from '../../models/caja';
import { CajaService } from '../../servicios/ser-caja/caja.service';
import { AuthService } from '../../servicios/ser-auth/auth.service';
import { Router } from '@angular/router';

declare var $: any;
@Component({
  selector: 'app-compra',
  templateUrl: './compra.component.html',
  styleUrls: ['./compra.component.css']
})
export class CompraComponent implements OnInit {

  detalle: any;
  nombre: any;
  nombrePersonal: any;
  almacenList: Almacen;
  cajaList: Caja;

  compraList: Compra[];
  constructor(
    private compraService: CompraService,
    private almacenService: AlmacenService,
    private toastr: ToastrService,
    private insumoService: InsumoService,
    public db: AngularFireDatabase,
    private cajaService: CajaService,
    private authService: AuthService,
    private router: Router
  ) {

    db.list('Insumo').snapshotChanges().subscribe(item => {
      this.detalle = [];
      item.forEach(element => {
        let x = element.payload.toJSON()
        x["$key"] = element.key
        this.detalle.push(x as Insumo)

      })
    })


    db.list('Proveedor').snapshotChanges().subscribe(item => {
      this.nombre = [];
      item.forEach(element => {
        let x = element.payload.toJSON()
        x["$key"] = element.key
        this.nombre.push(x as Proveedor)

      })
    })



    db.list('Personal').snapshotChanges().subscribe(item => {
      this.nombrePersonal = [];
      item.forEach(element => {
        let x = element.payload.toJSON()
        x["$key"] = element.key
        this.nombrePersonal.push(x as Personal)

      })
    })
  }





  onSubmit(compraForm: NgForm) {
    if (compraForm.value.$key == null) {

      var ref = firebase.database().ref('almacen');
      var des = (document.getElementById('descripcion') as HTMLInputElement).value;
      var cantidad = (document.getElementById('cantidad') as HTMLInputElement).value;

      var descripcion;
      var data;
      var key;
      let fecha = compraForm.value.fecha;
      let personal = compraForm.value.personal;
      let glosa = 'Por compra de ' + compraForm.value.descripcion;
      let salidaCaja = parseInt(compraForm.value.precioUnitario) * parseInt(compraForm.value.cantidad);
      let entradaCaja = '';

      this.compraService.insertCompra(compraForm.value);
      ref.orderByChild('descripcion').equalTo(des).on('value', snapshot => {

        // snapshot.forEach(snap => {
        key = Object.keys(snapshot.val())[0].toString();
        ref.orderByKey().equalTo(key).on('child_added', snap => {

          descripcion = snap.val().descripcion;
          let entrada;

          if (snap.val().entrada === null || snap.val().entrada === undefined || snap.val().entrada === '') {
            entrada = parseInt(cantidad);
          } else {
            entrada = parseInt(snap.val().entrada) + parseInt(cantidad);
          }

          // let salida = snap.val().salida;
          let salida = parseInt(snap.val().salida);
          // if (snap.val().salida === null || snap.val().salida === undefined || snap.val().salida === '') {
          //   salida = 0;
          // }
          // } else {
          if(snap.val().salida == NaN){ 
            salida = parseInt(snap.val().salida);
          }
          // }
          let total = entrada - salida;
          // if (salida == undefined || salida == null)
          // salida = 0;
          let estado = '';
          if (total == 0) {
            estado = 'vacio';
          } else if (total > 10) {
            estado = 'Lleno';
          } else if(total <= 10){
            estado = 'Poco';
          }
          
          // this.almacenService.updateAlmacen(null,this.almacenList.descripcion, this.almacenList.entrada, this.almacenList.salida, this.almacenList.estado, this.almacenList.total, Object.keys(snapshot.val())[0]);
          // setTimeout(() => {this.almacenService.updateAlmacen(null, descripcion, entrada, salida, estado, total, key)},3000);
          data = { descripcion, entrada, salida, estado, total };
        })
      })
      
      this.cajaService.insertCaja(null, fecha, glosa, entradaCaja, salidaCaja, personal);
      setTimeout(() => { firebase.database().ref().child('almacen/' + key).update(data);}, 1000);
      this.toastr.success('Operacion Correcta', 'Compra registrada correctamente');
    }
    else {
      this.compraService.updateCompra(compraForm.value);
      this.toastr.success('Operacion Correcta', 'Compra modificado correctamente')
    }
    this.resetForm(compraForm);
    $('#exampleModalScrollable').modal('hide');
  }
  resetForm(compraForm?: NgForm) {
    if (compraForm != null)
      compraForm.reset();
    this.compraService.selectedCompra = new Compra();
  }

  ngOnInit() {
    if(this.authService.correo === null  || this.authService.correo === undefined){
      this.router.navigate(['/autentificacion']);
    }
    this.compraService.getCompra()
      .snapshotChanges()
      .subscribe(item => {
        this.compraList = [];
        item.forEach(element => {
          let x = element.payload.toJSON();
          x["$key"] = element.key;
          this.compraList.push(x as Compra);
        });
      });

    this.cajaService.getCaja();

  }
  onEdit(compra: Compra) {
    this.compraService.selectedCompra = Object.assign({}, compra);
  }

  onDelete($key: string) {
    if (confirm('Esta seguro que desea eliminar?...')) {
      this.compraService.deleteCompra($key);
      this.toastr.success('Operacion Correcta', 'Compra eliminado correctamente')
    }

  }

  /* onSelect(event)
   {
       let query =null;
       query =this.insumoService.getC
   }*/


}
