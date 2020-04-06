import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RegistroComponent} from './components/registro/registro.component';
import {LoginComponent} from './components/login/login.component';
import {CrearComponent} from './components/admin/crear/crear.component';
import {ListadminComponent} from './components/admin/listadmin/listadmin.component';
import {UsuarioComponent} from './components/usuario/usuario.component';
import {ListwebComponent} from './components/web/listweb/listweb.component';
import {CrearwebComponent} from './components/web/crearweb/crearweb.component';
import {ModificarwebComponent} from './components/web/modificarweb/modificarweb.component';

const routes: Routes = [
  {path : 'registro', component: RegistroComponent},
  {path : '', component: LoginComponent},
  {path : 'crear-admin', component: CrearComponent},
  {path : 'list-admin', component: ListadminComponent},
  {path : 'list-web', component: ListwebComponent},
  {path : 'crear-web', component: CrearwebComponent},
  {path : 'modificar-web/:usuarioId', component: ModificarwebComponent},

  {
    path: ':usuarioId',
    component: UsuarioComponent,
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
