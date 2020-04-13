import {Material} from './material';

export class Item {
  Id?: number;
  Nombre?: string;
  Descripcion?: string;
  Imagen?: string;
  EsValido?: number; // Estado
  MaterialItem?: Material;
}
