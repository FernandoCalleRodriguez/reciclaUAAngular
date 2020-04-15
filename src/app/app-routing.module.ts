import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {CrearComponent} from './admin/crear/crear.component';
import {ListadminComponent} from './admin/listadmin/listadmin.component';
import {ListwebComponent} from './web/listweb/listweb.component';
import {CrearwebComponent} from './web/crearweb/crearweb.component';
import {ModificarwebComponent} from './web/modificarweb/modificarweb.component';
import {UsuarioComponent} from './usuario/usuario.component';
import {NotaComponent} from './admin/nota/nota.component';
import {AccionwebComponent} from './admin/accionweb/accionweb.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},

  {path: '', component: LoginComponent},

  {path: 'notaadmin', component: NotaComponent},
  {path: 'accionadmin', component: AccionwebComponent},


  {path: 'usuarioadmin/crear', component: CrearComponent},
  {path: 'usuarioadmin/listar', component: ListadminComponent},

  {path: 'usuarioweb/listar', component: ListwebComponent},
  {path: 'usuarioweb/crear', component: CrearwebComponent},
  {path: 'usuarioweb/modificar/:usuarioId', component: ModificarwebComponent},

  {path: 'usuario/:usuarioId', component: UsuarioComponent, pathMatch: 'full'},

  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
