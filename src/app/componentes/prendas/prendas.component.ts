import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
// servicio
import { PrendaService } from '../../servicios/ser-prenda/prenda.service'
import { Prenda } from "../../models/prenda";
import { ToastrService } from "ngx-toastr";
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from 'angularfire2/storage';
import { AuthService } from '../../servicios/ser-auth/auth.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
declare var $: any;
@Component({
  selector: 'app-prendas',
  templateUrl: './prendas.component.html',
  styleUrls: ['./prendas.component.css']
})
export class PrendasComponent implements OnInit {
  uploadPercent: Observable<number>;
  urlImage: Observable<string>;
  nombreFoto1: any;
  file: any;
  filePath: any;
  selectedImage: any;
  ref: any;
  img: any;
  imgSrc: any;
  @ViewChild('fileUploader', { static: false }) fileUploader: ElementRef;

  prendaList: Prenda[];
  constructor(
    private prendaService: PrendaService,
    private toastr: ToastrService,
    private storage: AngularFireStorage,
    private authService: AuthService,
    private router: Router
  ) { }


  onSubmit(prendaForm: NgForm) {
    this.img = (document.getElementById('urlImageValue') as HTMLInputElement).value;
    if (prendaForm.value.$key == null) {
      this.prendaService.selectedPrenda.imagen = this.img;
      prendaForm.value.imagen = this.img;
      this.prendaService.insertPrenda(prendaForm.value)
      this.toastr.success('Operacion Correcta', 'Prenda registrdo correctamente')
    }
    else {
      this.prendaService.selectedPrenda.imagen = this.img;
      prendaForm.value.imagen = this.img;
      this.prendaService.updatePrenda(prendaForm.value);
      this.toastr.success('Operacion Correcta', 'Prenda modificado correctamente')
    }
    this.resetForm(prendaForm);
    $('#exampleModalScrollable').modal('hide');
  }
  resetForm(prendaForm?: NgForm) {
    if (prendaForm != null)
      prendaForm.reset();
    this.prendaService.selectedPrenda = new Prenda();
  }





  ngOnInit() {
    if (this.authService.correo === null || this.authService.correo === undefined) {
      this.router.navigate(['/autentificacion']);
    }

    this.prendaService.getPrenda()
      .snapshotChanges()
      .subscribe(item => {
        this.prendaList = [];
        item.forEach(element => {
          let x = element.payload.toJSON();
          x["$key"] = element.key;
          this.prendaList.push(x as Prenda);
        });


      });
  }
  onEdit(prenda: Prenda) {
    this.imgSrc = prenda.imagen;
    this.prendaService.selectedPrenda = Object.assign({}, prenda);
  }

  onDelete($key: string) {
    let img;
    if (confirm('Esta seguro que desea eliminar?...')) {
      let refImg = firebase.database().ref('Prenda');
      refImg.orderByKey().equalTo($key).once('child_added', snap => {
        img = (snap.val().imagen).substring(88, 120);
        let img2 = (img).split("?");
        console.log(img2[0]);
        
        this.storage.ref('Upload/prendas/' + img2[0]).delete();
        this.prendaService.deletePrenda($key);
        this.toastr.success('Operacion Correcta', 'Prenda eliminado correctamente');
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
      if (this.prendaService.selectedPrenda.imagen != undefined) {
        let img = (this.prendaService.selectedPrenda.imagen).substring(89, 120);
        let img2 = (img).split("?");
        this.storage.ref('Upload/prendas/' + img2[0]).delete();
      }
    }
  }

  cargandoImagen(event: any) {
    // nombre aleatorio para la imagen
    const id = Math.random().toString(36).substring(2);
    this.file = event.target.files[0];
    this.filePath = 'Upload/prendas/prenda_' + id;
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
      this.prendaService.selectedPrenda.imagen = "";
    } else {
      let img = (this.prendaService.selectedPrenda.imagen).substring(89, 120);
      let img2 = (img).split("?");
      this.storage.ref('Upload/prenda/' + img2[0]).delete();
    }
  }

}
