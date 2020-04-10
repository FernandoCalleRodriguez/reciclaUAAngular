import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {NavbarComponent} from './shared/components/navbar/navbar.component';
import {SidebarComponent} from './shared/components/sidebar/sidebar.component';
import {LoginComponent} from './login/login.component';
import {FormsModule} from '@angular/forms';
import {UsuarioService} from './shared/services/usuario.service';
import {HttpClientModule} from '@angular/common/http';
import {UsuariolistarComponent} from './usuario/listarusuario/usuariolistar.component';
import {CrearusuarioComponent} from './usuario/crearusuario/crearusuario.component';
import {ModificarusuarioComponent} from './usuario/modificarusuario/modificarusuario.component';
import {AutenticacionService} from './shared/services/autenticacion.service';
import {UsuarioComponent} from './usuario/usuario/usuario.component';
import { RecuperarcontrasenaComponent } from './recuperarcontrasena/recuperarcontrasena.component';
import { RankingComponent } from './ranking/ranking.component';
import { VerificacionComponent } from './verificacion/verificacion.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    SidebarComponent,

    LoginComponent,

    UsuariolistarComponent,
    CrearusuarioComponent,
    ModificarusuarioComponent,
    UsuarioComponent,
    RecuperarcontrasenaComponent,
    RankingComponent,
    VerificacionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    UsuarioService,
    AutenticacionService
  ],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
