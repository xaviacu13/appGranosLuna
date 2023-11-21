import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/models/usuario';
import { NgForm, FormGroup } from '@angular/forms';
import { AuthService } from '../../servicios/ser-auth/auth.service';
import { UsuarioService } from 'src/app/servicios/ser-usuario/usuario.service';
import { ClienteService } from '../../servicios/ser-cliente/cliente.service';
import { Cliente } from 'src/app/models/cliente';
import { Observable } from 'rxjs/internal/Observable';
import { AngularFireStorage } from 'angularfire2/storage';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.css']
})
export class RegistroUsuarioComponent implements OnInit {
  usuarioList: Usuario[];
  uploadPercent: Observable<number>;
  urlImage: Observable<string>;
  nombreFoto1: any;
  file: any;
  filePath: any;
  selectedImage: any;
  ref: any;
  img: any;
  imgSrc: any;


  constructor(
    private toastr: ToastrService,
    private clienteService: ClienteService,
    private usuarioService: UsuarioService,
    private authService: AuthService,
    private storage: AngularFireStorage,
    private router: Router
  ) {
    // usuarioService.selectedUsuario.nivel
  }

  ngOnInit() {
    // if(this.authService.correo === null  || this.authService.correo === undefined){
    //   this.router.navigate(['/autentificacion']);
    // }

    this.clienteService.getCliente();
    this.usuarioService.getUsuario()
  }

  onSubmit(clienteForm) {
    this.usuarioList = [];

    this.img = (document.getElementById('urlImageValue') as HTMLInputElement).value;
    if (clienteForm.value.$key == null) {
      this.clienteService.selectedCliente.perfil = this.img;
      clienteForm.value.perfil = this.img;

      this.usuarioService.insertUsuario(null,clienteForm.value.ci,clienteForm.value.email,clienteForm.value.pass, 'Cliente')
      // this.usuarioList.push({
      //   $key: '',
      //   ci: clienteForm.value.ci,
      //   correo: clienteForm.value.email,
      //   pass: clienteForm.value.pass,
      //   nivel: 'Cliente'
      // });
      this.clienteService.insertCliente(clienteForm.value)
      this.authService.registerUser(clienteForm.value.email, clienteForm.value.pass);
      this.toastr.success('Operacion Correcta', 'Usuario registrado correctamente');
      
      
      this.router.navigate(['/'])
    }
    else {
      this.clienteService.updateCliente(clienteForm.value);
      this.toastr.success('Operacion Correcta', 'Usuario modificado correctamente')
    }
    this.resetForm(clienteForm);
  }

  resetForm(UsuarioForm?: NgForm) {
    if (UsuarioForm != null)
      UsuarioForm.reset();
    this.clienteService.selectedCliente = new Cliente();
  }

  uploadFile1(event: any) {
    // limpiamos la muestra de la imagen pequeña
    this.imgSrc = '';
    // nombre aleatorio para la imagen
    const id = Math.random().toString(36).substring(2);
    this.file = event.target.files[0];
    this.filePath = 'Upload/cliente/perfilCliente_' + id;
    this.ref = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath, this.file);
    this.uploadPercent = task.percentageChanges();
    task.snapshotChanges().pipe(finalize(() => this.urlImage = this.ref.getDownloadURL())).subscribe();
    // cargar muestra de imagen pequeña
    const reader = new FileReader();
    reader.onload = (e: any) => this.imgSrc = e.target.result;
    reader.readAsDataURL(event.target.files[0]);
    this.selectedImage = event.target.files[0];
  }
}

export function confirmandoPassword(
  controlName: string,
  matchingControlName: string
) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if (matchingControl.errors && !matchingControl.errors.mustMatch) {
      // return if another validator has already found an error on the matchingControl
      return;
    }

    // set error on matchingControl if validation fails
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({
        mustMatch: true
      });
    } else {
      matchingControl.setErrors(null);
    }
  };
}
