import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RegistroComponent} from './components/registro/registro.component';
import {LoginComponent} from './components/login/login.component';

const routes: Routes = [
  {path : 'registro', component: RegistroComponent},
  {path : '', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
