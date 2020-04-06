import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RegistroComponent} from './components/registro/registro.component';
import {LoginComponent} from './components/login/login.component';
import {CrearComponent} from './components/admin/crear/crear.component';
import {ListadminComponent} from './components/admin/listadmin/listadmin.component';
import {UsuarioComponent} from './components/usuario/usuario.component';
import {ListwebComponent} from './components/web/listweb/listweb.component';

const routes: Routes = [
  {path : 'registro', component: RegistroComponent},
  {path : '', component: LoginComponent},
  {path : 'crear-admin', component: CrearComponent},
  {path : 'list-admin', component: ListadminComponent},
  {
    path: ':usuarioId',
    component: UsuarioComponent,
    pathMatch: 'full'
  },
  {path : 'list-web', component: ListwebComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
