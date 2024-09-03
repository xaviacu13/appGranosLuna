import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../servicios/ser-auth/auth.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { Notification } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-autentificacion',
  templateUrl: './autentificacion.component.html',
  styleUrls: ['./autentificacion.component.css']
})
export class AutentificacionComponent implements OnInit {

  public email: string;
  public password: string;

  constructor(
    public authService: AuthService,
    public router: Router,
    public notificaciones: ToastrService
  ) { }

  ngOnInit() { }

  onLogin() {

    // this.authService.loginEmail(this.email, this.password)
     this.authService.loginEmail('admin@gmail.com','administrador')
    .then(res => {
        var ref = firebase.database().ref("Usuario");
        // ref.orderByChild("correo").equalTo(this.email).on("child_added", snap => {
         ref.orderByChild("correo").equalTo('admin@gmail.com').on("child_added", snap => {
            
          this.router.navigate(["/inicio"]);
        });
      }).catch(err => {
        this.notificaciones.error("Error", "Usuario o contraseña incorrectas");
      })
  }

  irRegistro() {
    this.router.navigate(["/regUsers"]);
  }
}

