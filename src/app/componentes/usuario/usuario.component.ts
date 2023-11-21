import { Component, OnInit } from '@angular/core';

import { UsuarioService } from '../../servicios/ser-usuario/usuario.service'
import { Usuario } from "../../models/usuario";
import { ToastrService } from "ngx-toastr";
import { NgForm } from '@angular/forms';
import { PersonalService } from '../../servicios/persona.service';
import { Personal } from 'src/app/models/personal';
import { AuthService } from '../../servicios/ser-auth/auth.service';
import { Router } from '@angular/router';
declare var $: any;


@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  usuarioList: Usuario[];
  personalList: Personal[];

  constructor(
    private usuarioService: UsuarioService,
    private toastr: ToastrService,
    private personalService: PersonalService,
    private authService: AuthService,
    private router: Router) {
  }



  onSubmit(UsuarioForm: NgForm) {
    if (UsuarioForm.value.$key == null) {
      this.authService.registerUser(UsuarioForm.value.correo, UsuarioForm.value.pass);
      this.usuarioService.insertUsuario(UsuarioForm.value);
      this.toastr.success('Operacion Correcta', 'Usuario registrdo correctamente');
    }
    else {
      this.usuarioService.updateUsuario(UsuarioForm.value);
      this.toastr.success('Operacion Correcta', 'Usuario modificado correctamente');
    }
    this.resetForm(UsuarioForm);
    $('#exampleModalScrollable').modal('hide');
  }

  resetForm(UsuarioForm?: NgForm) {
    if (UsuarioForm != null)
      UsuarioForm.reset();
    this.usuarioService.selectedUsuario = new Usuario();
  }

  ngOnInit() {
    if (this.authService.correo === null || this.authService.correo === undefined) {
      this.router.navigate(['/autentificacion']);
    }

    this.usuarioService.getUsuario()
      .snapshotChanges()
      .subscribe(item => {
        this.usuarioList = [];
        item.forEach(element => {
          let x = element.payload.toJSON();
          x["$key"] = element.key;
          this.usuarioList.push(x as Usuario);
        });
      });

    this.personalService.getPersonal()
      .snapshotChanges()
      .subscribe(item => {
        this.personalList = [];
        item.forEach(element => {
          let x = element.payload.toJSON();
          x["$key"] = element.key;
          this.personalList.push(x as Personal);
        });
      });


  }

  onEdit(usuario: Usuario) {


    this.usuarioService.selectedUsuario = Object.assign({}, usuario);
  }

  onDelete($key: string) {
    if (confirm('Esta seguro que desea eliminar Usuario?...')) {
      this.usuarioService.deleteUsuario($key);
      this.toastr.success('Operacion Correcta', 'Usuario eliminado correctamente')
    }
  }

  mensaje: any;
  keypress(event: any) {
    let contraseña = (document.getElementById('pass') as HTMLInputElement).value;
    if (contraseña == null || contraseña == undefined || contraseña == '') {
      alert('Introduzca su contraseña primero');
      (document.getElementById('pass1') as HTMLInputElement).value = '';
    } else {
      if (contraseña != event) {
        this.mensaje = 'Las contraseñas no coinciden'
      } else {
        this.mensaje = '';
      }
    }

  }

}
