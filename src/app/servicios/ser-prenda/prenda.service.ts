import { Injectable } from '@angular/core';
import{AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import{Prenda} from '../../models/prenda';

@Injectable({
  providedIn: 'root'
})
export class PrendaService {
  prendaList:AngularFireList<any>;
  selectedPrenda:Prenda=new Prenda();

  constructor(private firebase: AngularFireDatabase) { }
  getPrenda()
  {
   return this.prendaList=this.firebase.list('Prenda');
  }
  insertPrenda(prenda: Prenda)
  {
      this.prendaList.push({
        descripcion:prenda.descripcion,
        imagen:prenda.imagen,
        costConfeccion:prenda.costConfeccion,
        cantTela: prenda.cantTela || null,
        tiempoAcabado:prenda.tiempoAcabado,
        costAd:prenda.costAd || null,
      })
  }
  updatePrenda(prenda:Prenda)
   {
     this.prendaList.update(prenda.$key,{
      descripcion:prenda.descripcion,
      imagen:prenda.imagen,
      costConfeccion:prenda.costConfeccion,
      cantTela: prenda.cantTela || null,
      tiempoAcabado:prenda.tiempoAcabado,
      costAd:prenda.costAd || null,
     });
   }
   deletePrenda($key:string)
   {
     this.prendaList.remove($key);
   }
}