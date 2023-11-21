import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Usuario } from '../../models/usuario';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  usuarioList: AngularFireList<any>;
  selectedUsuario: Usuario = new Usuario();

  constructor(private firebase: AngularFireDatabase) { }

  getUsuario() {
    return this.usuarioList = this.firebase.list('Usuario');
  }
  insertUsuario(u?: Usuario, ci?: any, email?: any, pass?: any, cliente?: any) {
    if (u === null || u === undefined) {
      this.usuarioList.push({
        ci: ci,
        correo: email,
        pass: pass,
        nivel: cliente || null
      });
    } else {
      this.usuarioList.push({
        ci: u.ci,
        correo: u.correo,
        pass: u.pass,
        nivel: u.nivel
      });
    }
  }
  // if (u.nivel == undefined || u.nivel == null) {
  //   // console.log(u.ci);
  //   // console.log(u.correo);
  //   // console.log(u.pass);
  //   const client = 'Cliente';
  //   this.usuarioList.push({
  //     ci: u.ci,
  //     correo: u.correo,
  //     pass: u.pass,
  //     nivel: client || null
  //   });
  // } else {
  //   this.usuarioList.push({
  //     ci: u.ci,
  //     correo: u.correo,
  //     pass: u.pass,
  //     nivel: u.nivel
  //   });
  // }

updateUsuario(usuario: Usuario) {
  this.usuarioList.update(usuario.$key, {
    ci: usuario.ci,
    correo: usuario.correo,
    pass: usuario.pass,
    nivel: usuario.nivel,
  });
}
deleteUsuario($key: string) {
  this.usuarioList.remove($key);
}



}
