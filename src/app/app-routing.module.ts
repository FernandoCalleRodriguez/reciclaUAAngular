import {MaterielComponent} from './materiel/materiel.component';
import {ItemComponent} from './item/item.component';
import {NivelComponent} from './nivel/nivel.component';
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
import {EdificioComponent} from './edificio/edificio.component';
import {EstanciaComponent} from './estancia/estancia.component';
import {PlantaComponent} from './planta/planta.component';
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
  {path: 'ranking', component: RankingComponent},
  {path: 'verificacion/:usuarioId', component: VerificacionComponent},

  {path: 'listarusuario/:tipousuario', component: UsuariolistarComponent},
  {path: 'usuariocrear/:tipousuario', component: CrearusuarioComponent},
  {path: 'modificarusuario/:tipousuario/:usuarioId', component: ModificarusuarioComponent},
  {path: 'usuario/cambiarcontrasena/:usuarioId', component: CambiarcontrasenaComponent},
  {path: 'usuario/:tipousuario/:usuarioId', component: UsuarioComponent},

  {path: 'nota', component: NotaComponent},
  {path: 'nota/crear', component: FormNotaComponent},

  {path: 'accionweb', component: AccionwebComponent},
  {path: 'accionreciclar', component: AccionreciclarComponent},

  {path: 'tipoaccion', component: TipoaccionComponent},
  {path: 'tipoaccion/crear', component: FormTipoaccionComponent},


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

  {path: 'edificio/listar', component: EdificioComponent},
  {path: 'estancia/listar', component: EstanciaComponent},
  {path: 'planta/listar', component: PlantaComponent},
  {path: 'punto/listar', component: PuntoComponent},
  {path: 'contenedor/listar', component: ContenedorComponent},

  {path: 'usuario/:usuarioId', component: UsuarioComponent, pathMatch: 'full'},
  {path: 'juego/nivel', component: NivelComponent, pathMatch: 'full'},
  {path: 'juego/item', component: ItemComponent, pathMatch: 'full'},
  {path: 'juego/material', component: MaterielComponent, pathMatch: 'full'},
  {path: 'juego/item/:id', component: ItemComponent, pathMatch: 'full'},

  {path: '**', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
