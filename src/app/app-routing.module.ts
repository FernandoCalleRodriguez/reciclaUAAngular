import { MaterielComponent } from './materiel/materiel.component';
import { ItemComponent } from './item/item.component';
import { NivelComponent } from './nivel/nivel.component';
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

const routes: Routes = [
  {path: 'home', component: HomeComponent},

  {path: '', component: LoginComponent},

  {path: 'usuarioadmin/crear', component: CrearComponent},
  {path: 'usuarioadmin/listar', component: ListadminComponent},

  {path: 'usuarioweb/listar', component: ListwebComponent},
  {path: 'usuarioweb/crear', component: CrearwebComponent},
  {path: 'usuarioweb/modificar/:usuarioId', component: ModificarwebComponent},

  {path: 'usuario/:usuarioId', component: UsuarioComponent, pathMatch: 'full'},
  {path: 'juego/nivel', component: NivelComponent, pathMatch: 'full'},
  {path: 'juego/item', component: ItemComponent, pathMatch: 'full'},
  {path: 'juego/material', component: MaterielComponent, pathMatch: 'full'},
  {path: 'juego/item/:id', component: ItemComponent, pathMatch: 'full'},


  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
