import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {ListaDudasComponent} from './foro/lista-dudas/lista-dudas.component';
import {ListaRespuestasComponent} from './foro/lista-respuestas/lista-respuestas.component';
import {FormDudaComponent} from './foro/form-duda/form-duda.component';
import {FormRespuestaComponent} from './foro/form-respuesta/form-respuesta.component';
import {ListaValidacionesComponent} from './validacion/lista-validaciones/lista-validaciones.component';
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

  {path: 'login', component: LoginComponent},
  {path: 'login/:cerrarsesion', component: LoginComponent},
  {path: 'recuperarcontrasena', component: RecuperarcontrasenaComponent},
  {path: 'ranking', component: RankingComponent},
  {path: 'verificacion/:usuarioId', component: VerificacionComponent},

  {path: 'listarusuario/:tipousuario', component: UsuariolistarComponent},
  {path: 'usuariocrear/:tipousuario', component: CrearusuarioComponent},
  {path: 'modificarusuario/:tipousuario/:usuarioId', component: ModificarusuarioComponent},
  {path: 'usuario/cambiarcontrasena/:usuarioId', component: CambiarcontrasenaComponent},
  {path: 'usuario/:tipousuario/:usuarioId', component: UsuarioComponent},

  {path: 'usuario/:usuarioId', component: UsuarioComponent},

  {path: 'foro/duda/listar', component: ListaDudasComponent},
  {path: 'foro/duda/:dudaId/respuestas', component: ListaRespuestasComponent},
  {path: 'foro/respuesta/listar', component: ListaRespuestasComponent},
  {path: 'foro/duda/crear', component: FormDudaComponent},
  {path: 'foro/duda/:dudaId/modificar', component: FormDudaComponent},
  {path: 'foro/respuesta/crear', component: FormRespuestaComponent},
  {path: 'foro/respuesta/:respuestaId/modificar', component: FormRespuestaComponent},
  {path: 'foro/duda/:dudaId/respuesta/crear', component: FormRespuestaComponent},
  {path: 'foro/duda/:dudaId/respuesta/:respuestaId/modificar', component: FormRespuestaComponent},
  {path: 'validaciones', component: ListaValidacionesComponent},

  {path: '**', redirectTo: 'home'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
