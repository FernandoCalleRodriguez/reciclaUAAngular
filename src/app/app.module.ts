import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {NavbarComponent} from './shared/components/navbar/navbar.component';
import {LoginComponent} from './login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UsuarioService} from './shared/services/usuario.service';
import {HttpClientModule} from '@angular/common/http';
import {ListaDudasComponent} from './foro/lista-dudas/lista-dudas.component';
import {ListaRespuestasComponent} from './foro/lista-respuestas/lista-respuestas.component';
import {FormDudaComponent} from './foro/form-duda/form-duda.component';
import {FormRespuestaComponent} from './foro/form-respuesta/form-respuesta.component';
import {ListaValidacionesComponent} from './validacion/lista-validaciones/lista-validaciones.component';
import {DataTablesModule} from 'angular-datatables';
import {SweetAlert2Module} from '@sweetalert2/ngx-sweetalert2';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ToastrModule} from 'ngx-toastr';
import {DudaService} from './shared/services/duda.service';
import {RespuestaService} from './shared/services/respuesta.service';
import {ValidacionService} from './shared/services/validacion.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormDudaModalComponent} from './foro/form-duda-modal/form-duda-modal.component';
import {FormRespuestaModalComponent} from './foro/form-respuesta-modal/form-respuesta-modal.component';
import {TablaMaterialesComponent} from './validacion/tabla-materiales/tabla-materiales.component';
import {TablaItemsComponent} from './validacion/tabla-items/tabla-items.component';
import {TablaPuntosComponent} from './validacion/tabla-puntos/tabla-puntos.component';
import {UsuariolistarComponent} from './usuario/listarusuario/usuariolistar.component';
import {CrearusuarioComponent} from './usuario/crearusuario/crearusuario.component';
import {ModificarusuarioComponent} from './usuario/modificarusuario/modificarusuario.component';
import {AutenticacionService} from './shared/services/autenticacion.service';
import {RecuperarcontrasenaComponent} from './recuperarcontrasena/recuperarcontrasena.component';
import {RankingComponent} from './ranking/ranking.component';
import {VerificacionComponent} from './verificacion/verificacion.component';
import {CambiarcontrasenaComponent} from './usuario/cambiarcontrasena/cambiarcontrasena.component';
import {BnNgIdleService} from 'bn-ng-idle';
import {FormUsuarioModalComponent} from './usuario/form-usuario-modal/form-usuario-modal.component';
import {UsuarioComponent} from './usuario/usuario/usuario.component';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    LoginComponent,
    ListaDudasComponent,
    ListaRespuestasComponent,
    FormDudaComponent,
    FormRespuestaComponent,
    ListaValidacionesComponent,
    FormDudaModalComponent,
    FormRespuestaModalComponent,
    TablaMaterialesComponent,
    TablaItemsComponent,
    TablaPuntosComponent,
    LoginComponent,
    UsuariolistarComponent,
    CrearusuarioComponent,
    ModificarusuarioComponent,
    RecuperarcontrasenaComponent,
    RankingComponent,
    VerificacionComponent,
    CambiarcontrasenaComponent,
    FormUsuarioModalComponent,
    UsuarioComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    DataTablesModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    SweetAlert2Module.forRoot(),
    NgbModule
  ],
  providers: [
    UsuarioService,
    DudaService,
    RespuestaService,
    ValidacionService,
    UsuarioService,
    AutenticacionService,
    BnNgIdleService
  ],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
