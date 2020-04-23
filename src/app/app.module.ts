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
import {NgbCollapseModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
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
import {RecuperarcontrasenaComponent} from './usuario/recuperarcontrasena/recuperarcontrasena.component';
import {RankingComponent} from './usuario/ranking/ranking.component';
import {VerificacionComponent} from './verificacion/verificacion.component';
import {CambiarcontrasenaComponent} from './usuario/cambiarcontrasena/cambiarcontrasena.component';
import {BnNgIdleService} from 'bn-ng-idle';
import {FormUsuarioModalComponent} from './usuario/form-usuario-modal/form-usuario-modal.component';
import {UsuarioComponent} from './usuario/usuario/usuario.component';
import {RouterModule} from '@angular/router';
import {PuntoService} from './shared/services/punto.service';
import {EstanciaService} from './shared/services/estancia.service';
import {PlantaService} from './shared/services/planta.service';
import {EdificioService} from './shared/services/edificio.service';
import {PlantaComponent} from './ubicacion/planta/planta.component';
import {EstanciaComponent} from './ubicacion/estancia/estancia.component';
import {EdificioComponent} from './ubicacion/edificio/edificio.component';
import {PuntoComponent} from './punto/punto.component';

import {ContenedorComponent} from './contenedor/contenedor.component';
import {NivelComponent} from './juego/nivel/nivel.component';
import {MaterielComponent} from './juego/materiel/materiel.component';
import {ItemComponent} from './juego/item/item.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import { NotaComponent } from './notainfo/nota/nota.component';
import { AccionwebComponent } from './accion/accionweb/accionweb.component';
import { AccionreciclarComponent } from './accion/accionreciclar/accionreciclar.component';
import { TipoaccionComponent } from './accion/tipoaccion/tipoaccion.component';
import { FormNotaComponent } from './notainfo/form-nota/form-nota.component';
import { ModalNotaComponent } from './notainfo/modal-nota/modal-nota.component';
import { FormTipoaccionComponent } from './accion/form-tipoaccion/form-tipoaccion.component';
import { ModalTipoaccionComponent } from './accion/modal-tipoaccion/modal-tipoaccion.component';
import { ValidarElementoComponent } from './validacion/validar-elemento/validar-elemento.component';
import { MapaComponent } from './ubicacion/mapa/mapa.component';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';
import {TestComponent} from './test/test.component';


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
    UsuarioComponent,
    PlantaComponent,
    EstanciaComponent,
    EdificioComponent,
    PuntoComponent,
    ContenedorComponent,
    NivelComponent,
    MaterielComponent,
    ItemComponent,
    NotaComponent,
    AccionwebComponent,
    AccionreciclarComponent,
    TipoaccionComponent,
    FormNotaComponent,
    ModalNotaComponent,
    FormTipoaccionComponent,
    ModalTipoaccionComponent,
    ValidarElementoComponent,
    MapaComponent,
    TestComponent // test
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
    NgbModule,
    NgMultiSelectDropDownModule.forRoot(),
    LeafletModule,
    NgbCollapseModule,
  ],
  providers: [
    UsuarioService,
    DudaService,
    RespuestaService,
    ValidacionService,
    UsuarioService,
    AutenticacionService,
    BnNgIdleService,
    UsuarioService,
    EdificioService,
    PlantaService,
    EstanciaService,
    PuntoService,
    UsuarioService,
    NgbModule
  ],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
