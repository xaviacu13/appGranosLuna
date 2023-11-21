import { Component, OnInit } from '@angular/core';
import { CajaService } from '../../servicios/ser-caja/caja.service';
import { Caja } from '../../models/caja';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../servicios/ser-auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ingresos',
  templateUrl: './ingresos.component.html',
  styleUrls: ['./ingresos.component.css']
})
export class IngresosComponent implements OnInit {
  cajaList: Caja[];

  constructor(
    private cajaService: CajaService,
    private toastr: ToastrService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onSubmit(cajaForm)
  {
    if(this.authService.correo === null  || this.authService.correo === undefined){
      this.router.navigate(['/autentificacion']);
    }

    if (cajaForm.value.$key == null) {
      this.cajaService.insertCaja(cajaForm.value)
      this.toastr.success('Operacion Correcta', 'Ingreso registrado correctamente')
    }
    else {
      this.cajaService.updateCaja(cajaForm.value);
      this.toastr.success('Operacion Correcta', 'Registro modificado correctamente')
    }
    this.resetForm(cajaForm);
  }

  resetForm(cajaForm?: NgForm) {
    if (cajaForm != null)
      cajaForm.reset();
    this.cajaService.selectedCaja = new Caja();
  }

}
