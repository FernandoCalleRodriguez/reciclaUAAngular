import {MaterielComponent} from './juego/materiel/materiel.component';
import {ItemComponent} from './juego/item/item.component';
import {NivelComponent} from './juego/nivel/nivel.component';
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
import {RecuperarcontrasenaComponent} from './usuario/recuperarcontrasena/recuperarcontrasena.component';
import {UsuarioComponent} from './usuario/usuario/usuario.component';
import {RankingComponent} from './usuario/ranking/ranking.component';
import {VerificacionComponent} from './verificacion/verificacion.component';
import {CambiarcontrasenaComponent} from './usuario/cambiarcontrasena/cambiarcontrasena.component';
import {EdificioComponent} from './ubicacion/edificio/edificio.component';
import {EstanciaComponent} from './ubicacion/estancia/estancia.component';
import {PlantaComponent} from './ubicacion/planta/planta.component';
import {PuntoComponent} from './punto/punto.component';
import {ContenedorComponent} from './contenedor/contenedor.component';

import {NotaComponent} from './notainfo/nota/nota.component';
import {AccionwebComponent} from './accion/accionweb/accionweb.component';
import {AccionreciclarComponent} from './accion/accionreciclar/accionreciclar.component';
import {TipoaccionComponent} from './accion/tipoaccion/tipoaccion.component';
import {FormNotaComponent} from './notainfo/form-nota/form-nota.component';
import {FormTipoaccionComponent} from './accion/form-tipoaccion/form-tipoaccion.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},

  {path: 'login', component: LoginComponent},
  {path: 'login/:cerrarsesion', component: LoginComponent},
  {path: 'recuperarcontrasena', component: RecuperarcontrasenaComponent},
  {path: 'usuario/ranking', component: RankingComponent},
  /*{path: 'usuario/verificacion/:usuarioId', component: VerificacionComponent},*/
  {path: 'usuario/:tipousuario/listar', component: UsuariolistarComponent},
  {path: 'usuario/:tipousuario/crear', component: CrearusuarioComponent},
  {path: 'usuario/:tipousuario/:usuarioId/modificar', component: ModificarusuarioComponent},
  {path: 'usuario/cambiarcontrasena/:usuarioId', component: CambiarcontrasenaComponent},
  {path: 'usuario/:tipousuario/:usuarioId', component: UsuarioComponent},

  {path: 'nota/listar', component: NotaComponent},
  {path: 'nota/crear', component: FormNotaComponent},
  {path: 'accion/web/listar', component: AccionwebComponent},
  {path: 'accion/reciclar/listar', component: AccionreciclarComponent},
  {path: 'accion/tipo/listar', component: TipoaccionComponent},
  {path: 'accion/tipo/crear', component: FormTipoaccionComponent},

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

  {path: 'ubicacion/edificio/listar', component: EdificioComponent},
  {path: 'ubicacion/estancia/listar', component: EstanciaComponent},
  {path: 'ubicacion/planta/listar', component: PlantaComponent},
  {path: 'punto/listar', component: PuntoComponent},
  {path: 'contenedor/listar', component: ContenedorComponent},

  {path: 'juego/nivel/listar', component: NivelComponent, pathMatch: 'full'},
  {path: 'juego/item/listar', component: ItemComponent, pathMatch: 'full'},
  {path: 'juego/item/:id', component: ItemComponent, pathMatch: 'full'},
  {path: 'juego/material/listar', component: MaterielComponent, pathMatch: 'full'},

  {path: '**', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
