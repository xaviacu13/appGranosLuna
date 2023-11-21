import { Component, OnInit } from '@angular/core';
// servicio
import {SucursalService} from '../../servicios/ser-sucursal/sucursal.service'
import {Sucursal} from "../../models/sucursal";
import {ToastrService} from "ngx-toastr";
import { NgForm } from '@angular/forms';
import { AuthService } from '../../servicios/ser-auth/auth.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
declare var $:any;

@Component({
  selector: 'app-sucursal',
  templateUrl: './sucursal.component.html',
  styleUrls: ['./sucursal.component.css']
})
export class SucursalComponent implements OnInit {
 sucursalList:Sucursal[];
  constructor(private sucursalService:SucursalService,
              private toastr:ToastrService,
              private authService: AuthService,
              private router: Router) { }

 


  onSubmit(sucursalForm:NgForm)
  {
    if(sucursalForm.value.$key==null)
    {
     this.sucursalService.insertSucursal(sucursalForm.value)
     this.toastr.success('Operacion Correcta','Sucursal registrdo correctamente')
    }
     else
    {
    this.sucursalService.updateSucursal(sucursalForm.value);
    this.toastr.success('Operacion Correcta','Sucursal modificado correctamente')
    }
  this.resetForm(sucursalForm);
  $('#exampleModalScrollable').modal('hide');  
  }
  resetForm(sucursalForm?: NgForm)
  {
    if (sucursalForm != null)
    sucursalForm.reset();
    this.sucursalService.selectedSucursal=new Sucursal();
  }

  nivel = true;
  ngOnInit() {
    if (this.authService.correo === null || this.authService.correo === undefined) {
      this.router.navigate(['/autentificacion']);
    } else {
      let refUsuario = firebase.database().ref('Usuario');
      refUsuario.orderByChild('correo').equalTo(this.authService.correo).on('child_added', snap => {
        if (snap.val().nivel === 'Cliente')
        // console.log('cliente');
          this.nivel = false;
      })
    }
    // if(this.authService.correo === null  || this.authService.correo === undefined){
    //   this.router.navigate(['/autentificacion']);
    // }

    this.sucursalService.getSucursal()
    .snapshotChanges()
    .subscribe(item=>{
      this.sucursalList=[];
      item.forEach(element=>{let x = element.payload.toJSON();
        x["$key"] = element.key;
        this.sucursalList.push(x as Sucursal);
      });
     

    });
  }
   onEdit(sucursal:Sucursal)
   {
     this.sucursalService.selectedSucursal=Object.assign({}, sucursal);
   }

   onDelete($key:string)
   {
     if (confirm('Esta seguro que desea eliminar?...'))
     {
      this.sucursalService.deleteSucursal($key);
      this.toastr.success('Operacion Correcta','Sucursal eliminado correctamente')
     }
  
    }
 

}
