import {Estancia} from './estancia';
import {Contenedor} from './contenedor';

export class Punto {
  Id?: number;
  Latitud?: number;
  Longitud?: number;
  EsValido?: number; // Estado
  Contenedores?: Contenedor[];
  EstanciaPunto?: Estancia;
  Usuario_oid?: number;
  Estancia_oid?: string;
}
