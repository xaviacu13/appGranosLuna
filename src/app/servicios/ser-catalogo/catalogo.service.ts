import { Injectable } from '@angular/core';
import{AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import{Catalogo} from '../../models/catalogo';
@Injectable({
  providedIn: 'root'
})
export class CatalogoService {
  catalogoList:AngularFireList<any>;
  selectedCatalogo:Catalogo=new Catalogo();

  constructor(private firebase: AngularFireDatabase) { }

  getCatalogo()
  {
   return this.catalogoList=this.firebase.list('Catalogo');
  }
  insertCatalogo(catalogo: Catalogo)
  {
      this.catalogoList.push({

      
        descripcion:catalogo.descripcion,
        tipo:catalogo.tipo,
        precio:catalogo.precio,
        descuento:catalogo.descuento || null,
        tAcabado:catalogo.tAcabado,
        imagen1:catalogo.imagen1,
      })
  }
  updateCatalogo(catalogo:Catalogo)
   {
     this.catalogoList.update(catalogo.$key,{
      descripcion:catalogo.descripcion,
      tipo:catalogo.tipo,
      precio:catalogo.precio,
      descuento:catalogo.descuento || null,
      tAcabado:catalogo.tAcabado,
      imagen1:catalogo.imagen1,
      // imagen2:catalogo.imagen2,
     });
   }
   deleteCatalogo($key:string)
   {
     this.catalogoList.remove($key);
   }
}