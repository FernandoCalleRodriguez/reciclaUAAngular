import {Usuario} from './usuario';
import {Contenedor} from './contenedor';
import {Item} from './item';

export class AccionWeb {
  Id?: number;
  Fecha?: Date;
  Tipo?: TipoAccion;
  Usuario?: Usuario;
}

export class AccionReciclar {
  Id?: number;
  Usuario?: Usuario;
  ItemAccion?: Item;
  ContenedorAccion?: Contenedor;
  Cantidad?: number;
  Fecha?: Date;
}

export class TipoAccion {
  Id?: number;
  Puntuacion?: number;
  Acciones?: AccionWeb[];
  Nombre?: string;
}



