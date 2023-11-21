import { Injectable } from '@angular/core';
import{AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import{Dispensacion} from '../../models/dispensacion';
@Injectable({
  providedIn: 'root'
})
export class DispensacionService {
  dispensacionList:AngularFireList<any>;
  selectedDispensacion:Dispensacion=new Dispensacion();
  constructor(private firebase: AngularFireDatabase) { }

  getDispensacion()
  {
   return this.dispensacionList=this.firebase.list('dispensacion');
  }
  insertDispensacion(dispensacion: Dispensacion)
  {
      this.dispensacionList.push({
        descripcion:dispensacion.descripcion,
        personal:dispensacion.personal,
        cantidad:dispensacion.cantidad,
        fecha:dispensacion.fecha,
        obs:dispensacion.obs || null
      })
  }
  updateDispensacion(dispensacion:Dispensacion)
   {
     this.dispensacionList.update(dispensacion.$key,{
      descripcion:dispensacion.descripcion,
      personal:dispensacion.personal,
      cantidad:dispensacion.cantidad,
      fecha:dispensacion.fecha,
      obs:dispensacion.obs || null
     });
   }
   deleteDispensacion($key:string)
   {
     this.dispensacionList.remove($key);
   }
}
