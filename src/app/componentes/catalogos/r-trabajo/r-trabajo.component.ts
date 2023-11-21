import { Component, OnInit } from '@angular/core';
import { CatalogoService } from '../../../servicios/ser-catalogo/catalogo.service';
import { Catalogo } from 'src/app/models/catalogo';
import * as firebase from 'firebase/app';
import { AuthService } from '../../../servicios/ser-auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { CotizacionService } from '../../../servicios/ser-cotizacion/cotizacion.service';
import { Cotizacion } from 'src/app/models/cotizacion';
import { Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-r-trabajo',
  templateUrl: './r-trabajo.component.html',
  styleUrls: ['./r-trabajo.component.css']
})
export class RTrabajoComponent implements OnInit {
  correo: any;
  cedula: any;
  nombre: any;
  apellido: any;

  catalogoList: Catalogo[];
  cotizacionList: Cotizacion[];
  constructor(
    private catalogoService: CatalogoService,
    private cortizacionService: CotizacionService,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router) { }
  llave: string;
  ngOnInit() {
    if(this.authService.correo === null  || this.authService.correo === undefined){
      this.router.navigate(['/autentificacion']);
    }

    this.catalogoService.getCatalogo()
      .snapshotChanges()
      .subscribe(item => {
        this.catalogoList = [];
        item.forEach(element => {
          let x = element.payload.toJSON();
          x["$key"] = element.key;
          this.catalogoList.push(x as Catalogo);
        })
      })

    this.correo = this.authService.correo;
    // this.correo = 'cliente@gmail.com';
    var refCliente = firebase.database().ref('cliente');
    refCliente.orderByChild('email').equalTo(this.correo).on('child_added', snap => {
      this.cedula = snap.val().ci;
      this.nombre = snap.val().nombre;
      this.apellido = snap.val().apellido;
    });

    this.cortizacionService.getCotizacion();
  }

  imagen1: any;
  descripcion: any;
  precio: any;
  descuento: any;

  idImagen(id) {
    var ref = firebase.database().ref('Catalogo');
    this.llave = id;
    ref.orderByKey().equalTo(id).on('child_added', snap => {
      this.imagen1 = snap.val().imagen1;
      this.descripcion = snap.val().descripcion;
      this.precio = snap.val().precio;
      this.descuento = snap.val().descueto;
    })
  }

  btnPedir(cant) {
    if (cant.value === null || cant.value === undefined) {
      this.toastr.error('Operacion Incorrecta', 'Debe ingresar una cantidad');
    } else {
      this.cortizacionService.insertCotizacion(this.cedula, this.llave, cant.value);
      $('#exampleModalCenter').modal('hide');
      this.toastr.success('Operacion Correcta', 'Cotizacion correctamente');
    }
  }


}
