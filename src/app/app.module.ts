import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr'

// firebase
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AuthService } from './servicios/ser-auth/auth.service';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from '../environments/environment';
// import{AngularFireStorageModule} from '@angular/fire/storage'
import { AngularFireStorageModule } from 'angularfire2/storage'

//services 
import { PersonalService } from './servicios/persona.service';
import { InsumoService } from './servicios/ser-insumo/insumo.service';

import { AppComponent } from './app.component';
import { PersonalComponent } from './componentes/personal/personal.component';
import { MenuComponent } from './componentes/menu/menu.component';
import { EncabezadoComponent } from './componentes/encabezado/encabezado.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { CuerpoComponent } from './componentes/cuerpo/cuerpo.component';
import { ContactosComponent } from './componentes/contactos/contactos.component';
import { AppRoutingModule } from './app-routing.module';
import { InicioComponent } from './componentes/inicio/inicio.component';

import { InsumosComponent } from './componentes/insumos/insumos.component';
import { PersonalListComponent } from './componentes/personal/personal-list/personal-list.component';
import { PersonaComponent } from './componentes/personal/persona/persona.component';
import { ProveedoresComponent } from './componentes/proveedores/proveedores.component';
import { CatalogosComponent } from './componentes/catalogos/catalogos.component';
import { ChamarrasComponent } from './componentes/catalogos/chamarras/chamarras.component';
import { BuzosComponent } from './componentes/catalogos/buzos/buzos.component';
import { RTrabajoComponent } from './componentes/catalogos/r-trabajo/r-trabajo.component';
import { PolerasComponent } from './componentes/catalogos/poleras/poleras.component';
import { SucursalComponent } from './componentes/sucursal/sucursal.component';
import { ClientesComponent } from './componentes/clientes/clientes.component';
import { PrendasComponent } from './componentes/prendas/prendas.component';
import { CotizacionComponent } from './componentes/cotizacion/cotizacion.component';
import { RegistroPedidoComponent } from './componentes/registro-pedido/registro-pedido.component';
import { AlmacenComponent } from './componentes/almacen/almacen.component';
import { CompraComponent } from './componentes/compra/compra.component';
import { DispensacionComponent } from './componentes/dispensacion/dispensacion.component';
import { ItemRegistroComponent } from './componentes/item-registro/item-registro.component';
import { TallasRegistroComponent } from './componentes/tallas-registro/tallas-registro.component';
import { ImagenCatalogoComponent } from './componentes/imagen-catalogo/imagen-catalogo.component';
import { EntregaPedidosComponent } from './componentes/entrega-pedidos/entrega-pedidos.component';
import { CajaComponent } from './componentes/caja/caja.component';
import { IngresosComponent } from './componentes/ingresos/ingresos.component';
import { GastosComponent } from './componentes/gastos/gastos.component';
import { FilterPipe } from './pipes/filter.pipe';
import { PersonalFilterPipe } from './pipes/personal-filter.pipe';
import { InsumoFilterPipe } from './pipes/insumo-filter.pipe';
import { ProveedorFilterPipe } from './pipes/proveedor-filter.pipe';
import { AlmacenFilterPipe } from './pipes/almacen-filter.pipe';
import { UsuarioComponent } from './componentes/usuario/usuario.component';
//import { RregistroPedidoListComponent } from './componentes/rregistro-pedido-list/rregistro-pedido-list.component';
import { RegistroPedidoListComponent } from './componentes/registro-pedido-list/registro-pedido-list.component';
import { AutentificacionComponent } from './componentes/autentificacion/autentificacion.component';
import { RegistroUsuarioComponent } from './componentes/registro-usuario/registro-usuario.component';
//import { AlmacenService } from './servicios/ser-almacen/almacen.service';
import { CustomFormsModule } from 'ng2-validation';
// import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { CajaPipe } from './pipes/caja.pipe';

// import {NgbDatepickerModule} from '@ng-bootstrap/ng-bootstrap';


const routes: Routes = [
  { path: 'inicio', component: InicioComponent },
  //{ path: '', component: InicioComponent },
  { path: '', component: AutentificacionComponent },
  { path: 'insumos', component: InsumosComponent },
  { path: 'contactos', component: ContactosComponent },
  { path: 'personal', component: PersonalComponent },
  { path: 'personal-list', component: PersonalListComponent },
  { path: 'proveedor', component: ProveedoresComponent },
  { path: 'r-trabajo', component: RTrabajoComponent },
  { path: 'chamarras', component: ChamarrasComponent },
  { path: 'buzos', component: BuzosComponent },
  { path: 'poleras', component: PolerasComponent },
  { path: 'sucursal', component: SucursalComponent },
  { path: 'clientes', component: ClientesComponent },
  { path: 'prendas', component: PrendasComponent },
  { path: 'catalogos', component: CatalogosComponent },
  { path: 'cotizacion', component: CotizacionComponent },
  { path: 'almacen', component: AlmacenComponent },
  { path: 'compra', component: CompraComponent },
  { path: 'dispensacion', component: DispensacionComponent },
  { path: 'recepcion', component: RegistroPedidoComponent },
  { path: 'entregas', component: EntregaPedidosComponent },
  { path: 'caja', component: CajaComponent },
  { path: 'ingresos', component: IngresosComponent },
  { path: 'gastos', component: GastosComponent },
  { path: 'itemRegistro', component: ItemRegistroComponent },
  { path: 'usuarios', component: UsuarioComponent },
  { path: 'registropedidolist', component: RegistroPedidoListComponent },
  { path: 'autentificacion', component: AutentificacionComponent },
  { path: 'regUsers', component: RegistroUsuarioComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    PersonalComponent,
    MenuComponent,
    EncabezadoComponent,
    FooterComponent,
    CuerpoComponent,
    ContactosComponent,
    InicioComponent,
    InsumosComponent,
    PersonalListComponent,
    PersonaComponent,
    ProveedoresComponent,
    CatalogosComponent,
    ChamarrasComponent,
    BuzosComponent,
    RTrabajoComponent,
    PolerasComponent,
    SucursalComponent,
    ClientesComponent,
    PrendasComponent,
    CotizacionComponent,
    RegistroPedidoComponent,
    AlmacenComponent,
    CompraComponent,
    DispensacionComponent,
    ItemRegistroComponent,
    TallasRegistroComponent,
    ImagenCatalogoComponent,
    EntregaPedidosComponent,
    CajaComponent,
    IngresosComponent,
    GastosComponent,
    FilterPipe,
    PersonalFilterPipe,
    InsumoFilterPipe,
    ProveedorFilterPipe,
    AlmacenFilterPipe,
    UsuarioComponent,
    RegistroPedidoListComponent,
    AutentificacionComponent,
    RegistroUsuarioComponent,
    CajaPipe
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    AppRoutingModule,
    AngularFireModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    FormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    AngularFireAuthModule,
    NgbModule,
    CustomFormsModule,
    // NgbDatepickerModule
  ],

  providers: [
    AuthService,
    PersonalService,
    InsumoService,
    DatePipe

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
