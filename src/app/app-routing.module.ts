import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  { path: '', redirectTo: '/usuarios', pathMatch: 'full' },
  { path: 'usuarios', loadChildren: './usuarios/usuarios.module#UsuariosModule' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
