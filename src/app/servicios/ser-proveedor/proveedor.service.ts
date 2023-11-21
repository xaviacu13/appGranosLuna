import { Injectable } from '@angular/core';
import{AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import{Proveedor} from '../../models/proveedor';
@Injectable({
  providedIn: 'root'
})
export class ProveedorService {
  proveedorList:AngularFireList<any>;
  selectedProveedor:Proveedor=new Proveedor();

  constructor(private firebase: AngularFireDatabase) { }

  getProveedor()
  {
   return this.proveedorList=this.firebase.list('Proveedor');
  }
  insertProveedor(proveedor: Proveedor)
  {
      this.proveedorList.push({
        nombre:proveedor.nombre,
        nit:proveedor.nit,
        direccion:proveedor.direccion || null,
        telefono:proveedor.telefono || null,
        city:proveedor.city || null,
        email:proveedor.email || null,
        durl:proveedor.durl || null,
        
      })
  }
  updateProveedor(proveedor:Proveedor)
   {
     this.proveedorList.update(proveedor.$key,{
      nombre:proveedor.nombre,
      nit:proveedor.nit,
      direccion:proveedor.direccion || null,
      telefono:proveedor.telefono || null,
      city:proveedor.city || null,
      email:proveedor.email || null,
     durl:proveedor.durl || null,
    });
   }
   deleteProveedor($key:string)
   {
     this.proveedorList.remove($key);
   }
}






