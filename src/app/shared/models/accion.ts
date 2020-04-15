import {Usuario} from './usuario';

export class AccionWeb {
  Id?: number;
  Fecha?: Date;
  Tipo?: TipoAccion;
  Usuario?: Usuario;
}

export class TipoAccion {
  Id?: number;
  Puntuacion?: number;
  Acciones?: AccionWeb[];
  Nombre?: string;
}



