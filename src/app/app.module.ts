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
import {FormsModule} from '@angular/forms';
import {UsuarioService} from './shared/services/usuario.service';
import {HttpClientModule} from '@angular/common/http';
import { ListaDudasComponent } from './foro/lista-dudas/lista-dudas.component';
import { ListaRespuestasComponent } from './shared/components/lista-respuestas/lista-respuestas.component';
import { RespuestasComponent } from './foro/respuestas/respuestas.component';


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
    RespuestasComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    UsuarioService,
  ],
  exports: [
    NavbarComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
