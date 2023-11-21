import { Component, OnInit } from '@angular/core';
import { GastosService } from '../../servicios/ser-gastos/gastos.service';
import { ToastrService } from 'ngx-toastr';
import { CajaService } from '../../servicios/ser-caja/caja.service';
import { Caja } from '../../models/caja';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../servicios/ser-auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.component.html',
  styleUrls: ['./gastos.component.css']
})
export class GastosComponent implements OnInit {

  constructor(
    private gastosService: GastosService,
    private toastr: ToastrService,
    private cajaService: CajaService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    if(this.authService.correo === null  || this.authService.correo === undefined){
      this.router.navigate(['/autentificacion']);
    }
  }

  onSubmit(gastosForm)
  {
    if (gastosForm.value.$key == null) {
      this.cajaService.insertCaja(gastosForm.value)
      this.toastr.success('Operacion Correcta', 'Ingreso registrado correctamente')
    }
    else {
      this.cajaService.updateCaja(gastosForm.value);
      this.toastr.success('Operacion Correcta', 'Registro modificado correctamente')
    }
    this.resetForm(gastosForm);
  }

  resetForm(gastosForm?: NgForm) {
    if (gastosForm != null)
      gastosForm.reset();
    this.cajaService.selectedCaja = new Caja();
  }

}
