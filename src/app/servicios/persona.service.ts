import { Injectable } from '@angular/core';
import{AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import{ Personal } from '../models/personal';
@Injectable({
  providedIn: 'root'
})
export class PersonalService {
 personalList: AngularFireList<any>;
 selectedPersonal: Personal= new Personal();

  constructor(private firebase: AngularFireDatabase) { }

  
  getPersonal()
  {
   return this.personalList=this.firebase.list('Personal');
  }
  insertPersonal(personal: Personal)
  {
      this.personalList.push({
        nombre:personal.nombre,
        apellido: personal.apellido || null,
        ci:personal.ci,
        expedicion:personal.expedicion,
        fechaNacimiento:personal.fechaNacimiento,
        telefono:personal.telefono || null,
        direccion:personal.direccion || null,
        sexo:personal.sexo,
        cargo:personal.cargo,
        email:personal.email || null,
        perfil:personal.perfil,
      

      })
  }
  updatePersonal(personal:Personal)
   {
     this.personalList.update(personal.$key,{
      nombre:personal.nombre,
      apellido: personal.apellido || null,
      ci:personal.ci,
      expedicion:personal.expedicion,
      fechaNacimiento:personal.fechaNacimiento,
      telefono:personal.telefono || null,
      direccion:personal.direccion || null,
      sexo:personal.sexo,
      cargo:personal.cargo,
      email:personal.email || null,
      perfil:personal.perfil,
    
     });
   }
   deletePersonal($key:string)
   {
     this.personalList.remove($key);
   }
}
