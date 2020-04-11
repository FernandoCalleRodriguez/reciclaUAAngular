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
import {ListaDudasComponent} from './foro/lista-dudas/lista-dudas.component';
import {RespuestasComponent} from './foro/respuestas/respuestas.component';
import {FormDudaComponent} from './foro/form-duda/form-duda.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},

  {path: '', component: LoginComponent},

  {path: 'usuarioadmin/crear', component: CrearComponent},
  {path: 'usuarioadmin/listar', component: ListadminComponent},

  {path: 'usuarioweb/listar', component: ListwebComponent},
  {path: 'usuarioweb/crear', component: CrearwebComponent},
  {path: 'usuarioweb/modificar/:usuarioId', component: ModificarwebComponent},

  {path: 'usuario/:usuarioId', component: UsuarioComponent, pathMatch: 'full'},

  {path: 'foro/duda/listar', component: ListaDudasComponent},
  {path: 'foro/duda/:dudaId/respuestas', component: RespuestasComponent},
  {path: 'foro/respuesta/listar', component: RespuestasComponent},
  {path: 'foro/duda/crear', component: FormDudaComponent},
  {path: 'foro/duda/:dudaId/modificar', component: FormDudaComponent},

  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
