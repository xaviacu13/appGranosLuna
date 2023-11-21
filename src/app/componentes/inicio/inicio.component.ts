import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../servicios/ser-auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  constructor(private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    if(
    this.authService.correo === null  || this.authService.correo === undefined){
    this.router.navigate(['/autentificacion']);
  }
  }

}
