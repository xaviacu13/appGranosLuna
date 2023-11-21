import { Injectable } from '@angular/core';
import{AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import{Cliente } from '../../models/cliente';
import { calcPossibleSecurityContexts } from '@angular/compiler/src/template_parser/binding_parser';
import { createHostListener } from '@angular/compiler/src/core';
@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  clienteList:AngularFireList<any>;
  selectedCliente:Cliente=new Cliente();

  constructor(private firebase: AngularFireDatabase) { }


   
  getCliente()
  {
   return this.clienteList=this.firebase.list('cliente');
  }
  insertCliente(cliente: Cliente)
  {
      this.clienteList.push({
        nombre:cliente.nombre,
        apellido:cliente.apellido || null,
        ci:cliente.ci,
        expedicion:cliente.expedicion,
        telefono:cliente.telefono || null,
        direccion:cliente.direccion || null,
        sexo:cliente.sexo,
        email:cliente.email || null,
        perfil:cliente.perfil,
       
      })
  }
  updateCliente(cliente:Cliente)
   {
     this.clienteList.update(cliente.$key,{
      nombre:cliente.nombre,
      apellido:cliente.apellido || null,
      ci:cliente.ci,
      expedicion:cliente.expedicion,
      telefono:cliente.telefono || null,
      direccion:cliente.direccion || null,
      sexo:cliente.sexo,
      email:cliente.email || null,
      perfil:cliente.perfil,
     });
   }
   deleteCliente($key:string)
   {
     this.clienteList.remove($key);
   }
}
