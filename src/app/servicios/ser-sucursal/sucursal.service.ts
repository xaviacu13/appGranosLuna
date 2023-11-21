import { Injectable } from '@angular/core';
import{AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import{Sucursal} from '../../models/sucursal';
@Injectable({
  providedIn: 'root'
})
export class SucursalService {
  sucursalList:AngularFireList<any>;
  selectedSucursal:Sucursal=new Sucursal();

  constructor(private firebase: AngularFireDatabase) {}
  

  getSucursal()
  {
   return this.sucursalList=this.firebase.list('Sucursal');
  }
  insertSucursal(sucursal: Sucursal)
  {
      this.sucursalList.push({
        descripcion:sucursal.descripcion,
        direccion: sucursal.direccion,
        telefono:sucursal.telefono,
        encargado:sucursal.encargado,
        // ubicacion:sucursal.ubicacion,
       
      })
  }
  updateSucursal(sucursal:Sucursal)
   {
     this.sucursalList.update(sucursal.$key,{
      descripcion:sucursal.descripcion,
        direccion: sucursal.direccion,
        telefono:sucursal.telefono,
        encargado:sucursal.encargado,
        // ubicacion:sucursal.ubicacion,
     });
   }
   deleteSucursal($key:string)
   {
     this.sucursalList.remove($key);
   }



}
