import { Component, OnInit, Input } from '@angular/core';

// servicio
import { ItemRegistroService } from '../../servicios/ser-item_registro/item-registro.service'
import { ItemRegistro } from "../../models/item-registro";
import { ToastrService } from "ngx-toastr";
import { NgForm } from '@angular/forms';
declare var $: any;
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from 'angularfire2/storage';
import { AuthService } from '../../servicios/ser-auth/auth.service';
import { Router } from '@angular/router';
import { RegPedidoService } from '../../servicios/ser-reg_pedido/reg-pedido.service';
import { RegPedido } from '../../models/reg-pedido';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-item-registro',
  templateUrl: './item-registro.component.html',
  styleUrls: ['./item-registro.component.css']
})
export class ItemRegistroComponent implements OnInit {
  pedidoList: RegPedido[];

  uploadPercent: Observable<number>;
  urlImage: Observable<string>;
  nombreFoto1: any;
  file: any;
  filePath: any;
  selectedImage: any;
  ref: any;
  img: any;
  imgSrc: any;

  @Input() ciCliente;

  itemRegistroList: ItemRegistro[];
  constructor(
    private itemRegistroService: ItemRegistroService,
    private toastr: ToastrService,
    private storage: AngularFireStorage,
    private authService: AuthService,
    private router: Router,
    private pedidoService: RegPedidoService
  ) {
    // if((document.getElementById('idRegistro') as HTMLInputElement).value != null ||  (document.getElementById('idRegistro') as HTMLInputElement).value != undefined)

    // console.log((document.getElementById('idRegistro') as HTMLInputElement).value);
  }

  filterPost = '';
  a: number;
  b: number;
  s: number;

  Suma(a: number, b: number) {

  }

  onSubmit(itemRegistroForm: NgForm) {
    this.img = (document.getElementById('urlImageValue') as HTMLInputElement).value;
    itemRegistroForm.value.idRegistro = (document.getElementById('idRegistro') as HTMLInputElement).value;

    if (itemRegistroForm.value.$key == null) {
      itemRegistroForm.value.modelo = this.img
      this.itemRegistroService.insertItemRegistro(itemRegistroForm.value)
      this.toastr.success('Operacion Correcta', 'Item Pedido registrdo correctamente')
    }
    else {
      this.itemRegistroService.updateItemRegistro(itemRegistroForm.value);
      this.toastr.success('Operacion Correcta', 'Item Pedido modificado correctamente')
    }
    this.resetForm(itemRegistroForm);
    $('#exampleModalScrollable').modal('hide');
  }

  resetForm(itemRegistroForm?: NgForm) {
    if (itemRegistroForm != null)
      itemRegistroForm.reset();
    this.itemRegistroService.selectedItemRegistro = new ItemRegistro();
  }

  verDatos(llaveDatos) {

    this.itemRegistroService.getItemRegistro()
      .snapshotChanges()
      .subscribe(item => {
        this.itemRegistroList = [];
        item.forEach(element => {
          let x = element.payload.toJSON();
          x["$key"] = element.key;
          
          if (x["idRegistro"] === llaveDatos) {
            this.itemRegistroList.push(x as ItemRegistro);
          }
        });
      });


    // var refItemRegistro = firebase.database().ref('itemRegistro');
    // refItemRegistro.orderByKey().equalTo(llaveDatos).on('child_added', snap=>{

    // });

  }




  ngOnInit() {
    if(this.authService.correo === null  || this.authService.correo === undefined){
      this.router.navigate(['/autentificacion']);
    }


    this.pedidoService.getRegPedido().snapshotChanges().subscribe(item => {
      this.pedidoList = [];
      item.forEach(element => {
        let x = element.payload.toJSON();
        x["key"] = element.key;
        this.pedidoList.push(x as RegPedido);
      });
    });


    // this.itemRegistroService.getItemRegistro()
    //   .snapshotChanges()
    //   .subscribe(item => {
    //     this.itemRegistroList = [];
    //     item.forEach(element => {
    //       let x = element.payload.toJSON();
    //       x["$key"] = element.key;
    //       this.itemRegistroList.push(x as ItemRegistro);
    //     });
    //   });

  }
  onEdit(insumo: ItemRegistro) {
    this.itemRegistroService.selectedItemRegistro = Object.assign({}, insumo);
  }

  onDelete($key: string) {
    if (confirm('Esta seguro que desea eliminar?...')) {
      this.itemRegistroService.deleteItemRegistro($key);
      this.toastr.success('Operacion Correcta', 'Item Registro eliminado correctamente')
    }

  }

  uploadFile1(event: any) {
    // limpiamos la muestra de la imagen pequeña
    this.imgSrc = '';
    // nombre aleatorio para la imagen
    const id = Math.random().toString(36).substring(2);
    this.file = event.target.files[0];
    this.filePath = 'Upload/personal/perfilPersonal_' + id;
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
