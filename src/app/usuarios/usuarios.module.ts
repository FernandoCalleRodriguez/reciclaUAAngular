import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UsuariosRoutingModule} from './usuarios-routing.module';

import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {LoginComponent} from './components/login/login.component';
import {RegistroComponent} from './components/registro/registro.component';

import {UsuarioService} from './services/usuario.service';

@NgModule({
  declarations: [
    LoginComponent,
    RegistroComponent
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    UsuarioService,
  ]
})
export class UsuariosModule {
}
