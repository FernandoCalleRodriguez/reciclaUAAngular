import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {UsuariolistarComponent} from './usuario/listarusuario/usuariolistar.component';
import {CrearusuarioComponent} from './usuario/crearusuario/crearusuario.component';
import {ModificarusuarioComponent} from './usuario/modificarusuario/modificarusuario.component';
import {RecuperarcontrasenaComponent} from './recuperarcontrasena/recuperarcontrasena.component';
import {UsuarioComponent} from './usuario/usuario/usuario.component';
import {RankingComponent} from './ranking/ranking.component';
import {VerificacionComponent} from './verificacion/verificacion.component';
import {CambiarcontrasenaComponent} from './usuario/cambiarcontrasena/cambiarcontrasena.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},

  {path: '', component: LoginComponent},
  {path: 'recuperarcontrasena', component: RecuperarcontrasenaComponent},
  {path: 'ranking', component: RankingComponent},
  {path: 'verificacion/:usuarioId', component: VerificacionComponent},

  {path: 'listarusuario/:tipousuario', component: UsuariolistarComponent},
  {path: 'usuariocrear/:tipousuario', component: CrearusuarioComponent},
  {path: 'modificarusuario/:tipousuario/:usuarioId', component: ModificarusuarioComponent},
  {path: 'usuario/cambiarcontrasena/:usuarioId', component: CambiarcontrasenaComponent},
  {path: 'usuario/:tipousuario/:usuarioId', component: UsuarioComponent},

  {path: '**', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
