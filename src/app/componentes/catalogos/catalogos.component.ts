import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { CatalogoService } from '../../servicios/ser-catalogo/catalogo.service';
import { Catalogo } from "../../models/catalogo";
import { ToastrService } from "ngx-toastr";
// import{AngularFireStorage} from '@angular/fire/storage';
import { AngularFireStorage } from 'angularfire2/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { element } from 'protractor';
import { isObject } from 'util';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../servicios/ser-auth/auth.service';
import * as firebase from 'firebase/app';

declare var $: any;
@Component({
  selector: 'app-catalogos',
  templateUrl: './catalogos.component.html',
  styleUrls: ['./catalogos.component.css']
})
export class CatalogosComponent implements OnInit {
  uploadPercent: Observable<number>;
  // urlImage: Observable<string>;
  nombreFoto1: any;
  file: any;
  filePath: any;
  selectedImage: any;
  ref: any;
  img: any;
  imgSrc: any;

  @ViewChild('fileUploader', { static: false }) fileUploader: ElementRef;

  catalogoList: Catalogo[];
  constructor(
    private catalogoService: CatalogoService,
    private toastr: ToastrService,
    private router: Router,
    private storage: AngularFireStorage,
    private authService: AuthService
  ) { }
  upLaodPercent: Observable<number>;
  urlImage: Observable<string>;


  // onUpload(e)
  // {
  //   this.img = (document.getElementById('urlImageValue') as HTMLInputElement).value;

  // //   const id=Math.random().toString(36).substring(2);
  // //   const file =e.target.files[0];
  // // // const filePath='uploads/profile_${id}';
  // //   const filePath='uploads/zbvc';

  // //    //const ref = this.storage.ref(filePath);
  // //    const task = this.storage.upload(filePath,file);
  //   // this.upLaodPercent=task.percentageChanges();
  //   // task.snapshotChanges().pipe(finalize(()=>this.urlImage=ref.getDownloadURL())).subscribe();
  // }

  onSubmit(catalogoForm: NgForm) {
    this.img = (document.getElementById('urlImageValue') as HTMLInputElement).value;
    if (catalogoForm.value.$key == null) {
      this.catalogoService.selectedCatalogo.imagen1 = this.img;
      catalogoForm.value.imagen1 = this.img;
      this.catalogoService.insertCatalogo(catalogoForm.value)
      this.toastr.success('Operacion Correcta', 'Catalogo registrado correctamente')
    }
    else {
      this.catalogoService.selectedCatalogo.imagen1 = this.img;
      catalogoForm.value.imagen1 = this.img;
      this.catalogoService.updateCatalogo(catalogoForm.value);
      this.toastr.success('Operacion Correcta', 'Catalogo modificado correctamente')
    }
    this.resetForm(catalogoForm);

    $('#exampleModalScrollable').modal('hide');
  }
  
  resetForm(catalogoForm?: NgForm) {
    if (catalogoForm != null)
      catalogoForm.reset();
    this.catalogoService.selectedCatalogo = new Catalogo();
    this.imgSrc = '';
    this.fileUploader.nativeElement.value = "";
  }


  nombre: any;
  apellido: any;
  cedula: any;
  correo: any;
  ngOnInit() {
    if (this.authService.correo === null || this.authService.correo === undefined) {
      this.router.navigate(['/autentificacion']);
    }
    this.catalogoService.getCatalogo()
      .snapshotChanges()
      .subscribe(item => {
        this.catalogoList = [];
        item.forEach(element => {
          let x = element.payload.toJSON();
          x["$key"] = element.key;
          this.catalogoList.push(x as Catalogo);
        });
      });
    // this.correo = this.authService.correo;
    // var refCliente = firebase.database().ref('Usuario');
    // refCliente.orderByChild('correo').equalTo(this.correo).on('child_added', snap=>{
    //   this.cedula = snap.val().ci;
    // });

  }

  onEdit(catalogo: Catalogo) {
    this.imgSrc = catalogo.imagen1;
    this.catalogoService.selectedCatalogo = Object.assign({}, catalogo);
  }

  onDelete($key: string) {
    let img;
    if (confirm('Esta seguro que desea eliminar?...')) {
      let refImg = firebase.database().ref('Catalogo');
      refImg.orderByKey().equalTo($key).once('child_added', snap => {
        img = (snap.val().imagen1).substring(90, 120);
        let img2 = (img).split("?");
        this.storage.ref('Upload/catalogos/' + img2[0]).delete();
        this.catalogoService.deleteCatalogo($key);
        this.toastr.success('Operacion Correcta', 'Catalogo eliminado correctamente')
      })
    }
  }

  uploadFile1(event: any) {
    // limpiamos la muestra de la imagen pequeña
    this.imgSrc = '';
    if (this.filePath != undefined) {
      this.storage.ref(this.filePath).delete();
      this.cargandoImagen(event);

    } else {
      this.cargandoImagen(event);
      if (this.catalogoService.selectedCatalogo.imagen1 != undefined) {
        let img = (this.catalogoService.selectedCatalogo.imagen1).substring(89, 120);
        let img2 = (img).split("?");
        this.storage.ref('Upload/catalogos/' + img2[0]).delete();
      }
    }
  }

  cargandoImagen(event: any) {
    // nombre aleatorio para la imagen
    const id = Math.random().toString(36).substring(2);
    this.file = event.target.files[0];
    this.filePath = 'Upload/catalogos/catalogo_' + id;
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

  deletImg() {
    if (this.filePath != undefined) {
      this.storage.ref(this.filePath).delete();
      this.imgSrc = '';
      this.fileUploader.nativeElement.value = "";
      this.catalogoService.selectedCatalogo.imagen1 = "";
    } else {
      let img = (this.catalogoService.selectedCatalogo.imagen1).substring(89, 120);
      let img2 = (img).split("?");
      this.storage.ref('Upload/catalogos/' + img2[0]).delete();
    }
  }
}