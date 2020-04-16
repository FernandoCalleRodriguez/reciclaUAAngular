import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {NavbarComponent} from './shared/components/navbar/navbar.component';
import {SidebarComponent} from './shared/components/sidebar/sidebar.component';
import {LoginComponent} from './login/login.component';
import {CrearComponent} from './admin/crear/crear.component';
import {ListadminComponent} from './admin/listadmin/listadmin.component';
import {UsuarioComponent} from './usuario/usuario.component';
import {ListwebComponent} from './web/listweb/listweb.component';
import {ModificarwebComponent} from './web/modificarweb/modificarweb.component';
import {CrearwebComponent} from './web/crearweb/crearweb.component';
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
import { FormDudaModalComponent } from './foro/form-duda-modal/form-duda-modal.component';
import { FormRespuestaModalComponent } from './foro/form-respuesta-modal/form-respuesta-modal.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    SidebarComponent,
    LoginComponent,
    CrearComponent,
    ListadminComponent,
    UsuarioComponent,
    ListwebComponent,
    CrearwebComponent,
    ModificarwebComponent,
    ListaDudasComponent,
    ListaRespuestasComponent,
    ListaRespuestasComponent,
    FormDudaComponent,
    FormRespuestaComponent,
    ListaValidacionesComponent,
    FormDudaModalComponent,
    FormRespuestaModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    DataTablesModule,
    ToastrModule.forRoot(),
    SweetAlert2Module.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [
    UsuarioService,
    DudaService,
    RespuestaService,
    ValidacionService,
    NgbModule
  ],
  exports: [
    NavbarComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
