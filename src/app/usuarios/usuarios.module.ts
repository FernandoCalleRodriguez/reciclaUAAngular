import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UsuariosRoutingModule} from './usuarios-routing.module';

import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {LoginComponent} from './components/login/login.component';
import {RegistroComponent} from './components/registro/registro.component';

import {UsuarioService} from '../shared/services/usuario.service';
import { CrearComponent } from './components/admin/crear/crear.component';
import { ListadminComponent } from './components/admin/listadmin/listadmin.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { ListwebComponent } from './components/web/listweb/listweb.component';
import { CrearwebComponent } from './components/web/crearweb/crearweb.component';
import { ModificarwebComponent } from './components/web/modificarweb/modificarweb.component';
import {NavbarComponent} from '../shared/components/navbar/navbar.component';
import {AppModule} from '../app.module';
import { UsuariowebComponent } from './components/web/usuarioweb/usuarioweb.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegistroComponent,
    CrearComponent,
    ListadminComponent,
    UsuarioComponent,
    ListwebComponent,
    CrearwebComponent,
    ModificarwebComponent,
    UsuariowebComponent,
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    FormsModule,
    HttpClientModule],
  providers: [
    UsuarioService,
  ]
})
export class UsuariosModule {
}
