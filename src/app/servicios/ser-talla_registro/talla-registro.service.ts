import { Injectable } from '@angular/core';

import{AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import{TallaRegistro} from '../../models/talla-registro';
@Injectable({
  providedIn: 'root'
})
export class TallaRegistroService {

  tallaRegistroList:AngularFireList<any>;
  selectedTallaRegistro:TallaRegistro=new TallaRegistro();


  constructor(private firebase: AngularFireDatabase) { }

  getTallaRegistro()
  {
   return this.tallaRegistroList=this.firebase.list('TallaRegistro');
  }
  insertTallaRegistro(tallaR: TallaRegistro)
  {
      this.tallaRegistroList.push({
        talla:tallaR.talla,
        cantidad:tallaR.cantidad,
        obs:tallaR.obs,
        
      })
  }
  updateTallaRegistro(tallaR:TallaRegistro)
   {
     this.tallaRegistroList.update(tallaR.$key,{
      talla:tallaR.talla,
      cantidad:tallaR.cantidad,
      obs:tallaR.obs,
    });
   }
   deleteTallaRegistro($key:string)
   {
     this.tallaRegistroList.remove($key);
   }
}
