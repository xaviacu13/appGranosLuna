import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../servicios/ser-auth/auth.service';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';


@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.css']
})
export class EncabezadoComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.isRecepcionista = false;
    this.isClient = false;
    this.isAdmin = false;
  }

  isLogin = true;
  isAdmin = false;
  isClient = false;
  isRecepcionista = false;
  emailUsuario: any;

  ngOnInit() {


    // this.onCheckUser();
    this.authService.getAuth().subscribe(auth => {
      if (auth) {
        // this.isLogin=true;

        // this.nombreUsuario=auth.displayName;
        this.emailUsuario = auth.email;
        // console.log('auth::: '+this.emailUsuario);


        var ref = firebase.database().ref("Usuario");
        // ref.orderByChild('correoUsuario').equalTo(this.authService.correo).on("child_added", snap => {
        // ref.orderByChild('correoUsuario').equalTo(this.emailUsuario).on("child_added", snap => {
        ref.orderByChild("correo").equalTo(this.emailUsuario).on("child_added", snap => {
          if (snap.val().nivel === 'Recepcionista') {
            this.isRecepcionista = true;
            this.isClient = false;
            this.isAdmin = false;
          } else if (snap.val().nivel === 'Cliente') {
            this.isClient = true;
            this.isRecepcionista = false;
            this.isAdmin = false;
          } else if (snap.val().nivel === 'Administrador') {
            this.isAdmin = true;
            this.isRecepcionista = false;
            this.isClient = false;
          }
          // console.log(snap.val().nivel);

          // console.log(snap.val().cargoUsuario);
          // if (
          //   crypto.AES.decrypt(
          //     snap.val().correoUsuario,
          //     this.keySecret.trim()
          //   ).toString(crypto.enc.Utf8) === this.emailUsuario
          // ) {
          //   if (crypto.AES.decrypt(snap.val().cargoUsuario, this.keySecret.trim()).toString(crypto.enc.Utf8) === "Administrador") {
          //     // if (this.authService.correo != null) {
          //     this.isAdmin = true;
          //     // }
          //   }
          // }
        });

      }
    });
    // if (this.authService.correo === null || this.authService.correo === undefined) {
    //   // console.log(this.isRecepcionista);
    //   // console.log(this.isClient);
    //   // console.log(this.isAdmin);
    //   this.isRecepcionista = false;
    //   this.isClient = false;
    //   this.isAdmin = false;
    //   this.router.navigate(['/autentificacion']);
    // }
  }

  onCheckUser(): void {
    if (this.authService.getAuth() == null) {
      this.isLogin == false;
    } else {
      this.isLogin == true;
    }
  }

  onClickLogout() {
    this.authService.logOut();
  }

}
