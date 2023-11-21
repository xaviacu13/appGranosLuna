import { Component, OnInit } from '@angular/core';
import { DispensacionService } from '../../servicios/ser-dispensacion/dispensacion.service';
import { Dispensacion } from "../../models/dispensacion";
import { ToastrService } from "ngx-toastr"

import { NgForm } from '@angular/forms'
import { AngularFireDatabase } from 'angularfire2/database'
import { InsumoService } from "../../servicios/ser-insumo/insumo.service"
import { Insumo } from "../../models/insumo";
import { Personal } from 'src/app/models/personal';
import * as firebase from 'firebase/app';
import { CompraService } from '../../servicios/ser-compra/compra.service';
import { AuthService } from '../../servicios/ser-auth/auth.service';
import { Router } from '@angular/router';

declare var $: any;
@Component({
  selector: 'app-dispensacion',
  templateUrl: './dispensacion.component.html',
  styleUrls: ['./dispensacion.component.css']
})
export class DispensacionComponent implements OnInit {
  detalle: any;
  nombrePersonal: any;
  dispensacionList: Dispensacion[];
  constructor(
    private dispensacionService: DispensacionService,
    private toastr: ToastrService,
    public db: AngularFireDatabase,
    public compraService: CompraService,
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



    db.list('Personal').snapshotChanges().subscribe(item => {
      this.nombrePersonal = [];
      item.forEach(element => {
        let x = element.payload.toJSON()
        x["$key"] = element.key
        this.nombrePersonal.push(x as Personal)

      })
    })
  }



  onSubmit(dispensacionForm: NgForm) {
    if (dispensacionForm.value.$key == null) {

      this.dispensacionService.insertDispensacion(dispensacionForm.value);
      var ref = firebase.database().ref('almacen');
      var des = (document.getElementById('descripcion') as HTMLInputElement).value;
      var cantidad = (document.getElementById('cantidad') as HTMLInputElement).value;
      var descripcion;
      var data;
      var key;

      ref.orderByChild('descripcion').equalTo(des).on('value', snapshot => {

        key = Object.keys(snapshot.val())[0].toString();
        ref.orderByKey().equalTo(key).on('child_added', snap => {
          descripcion = snap.val().descripcion;
          let entrada = parseInt(snap.val().entrada);
          let salida:number = parseInt(snap.val().salida) + parseInt(cantidad);
          let total = entrada - salida;
          if (salida == undefined || salida == null)
            salida = 0;
          let estado = '';
          if (total < 10) {
            estado = 'Poco';
          } else if (total > 10) {
            estado = 'Lleno';
          } else {
            estado = 'vacio';
          }
          
          // this.almacenService.updateAlmacen(null,this.almacenList.descripcion, this.almacenList.entrada, this.almacenList.salida, this.almacenList.estado, this.almacenList.total, Object.keys(snapshot.val())[0]);
          // setTimeout(() => {this.almacenService.updateAlmacen(null, descripcion, entrada, salida, estado, total, key)},3000);
          data = { descripcion, entrada, salida, estado, total };
        })
      })
      firebase.database().ref().child('almacen/' + key).update(data);
      this.toastr.success('Operacion Correcta', 'Dispensacion registrada correctamente');
    }
    else {
      this.dispensacionService.updateDispensacion(dispensacionForm.value);
      this.toastr.success('Operacion Correcta', 'Compra modificado correctamente')
    }
    $('#exampleModalScrollable').modal('hide');
    this.resetForm(dispensacionForm);
  }
  resetForm(dispensacionForm?: NgForm) {
    if (dispensacionForm != null)
      dispensacionForm.reset();
    this.dispensacionService.selectedDispensacion = new Dispensacion();
  }





  ngOnInit() {
    if(this.authService.correo === null  || this.authService.correo === undefined){
      this.router.navigate(['/autentificacion']);
    }
    this.dispensacionService.getDispensacion()
      .snapshotChanges()
      .subscribe(item => {
        this.dispensacionList = [];
        item.forEach(element => {
          let x = element.payload.toJSON();
          x["$key"] = element.key;
          this.dispensacionList.push(x as Dispensacion);
        });


      });
  }
  onEdit(dispensacion: Dispensacion) {
    this.dispensacionService.selectedDispensacion = Object.assign({}, dispensacion);
  }

  onDelete($key: string) {
    if (confirm('Esta seguro que desea eliminar?...')) {
      this.dispensacionService.deleteDispensacion($key);
      this.toastr.success('Operacion Correcta', 'Dispensacion eliminado correctamente')
    }

  }


}
