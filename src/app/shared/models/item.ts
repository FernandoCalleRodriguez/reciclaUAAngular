import {Material} from './material';
import {Estado} from './estado';

export class Item {
  Id?: number;
  Nombre?: string;
  Descripcion?: string;
  Imagen?: string;
  EsValido?: number;
  Usuario_oid?: number;
  Material_oid?: number;
  MaterialItem?: Material;
  Puntuacion?: number;
}

