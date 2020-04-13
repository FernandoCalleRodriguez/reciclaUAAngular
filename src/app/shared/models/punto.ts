import {Estancia} from './estancia';
import {Contenedor} from './contenedor';

export class Punto {
  Id?: number;
  Latitud?: number;
  Longitud?: number;
  EsValido?: boolean;
  Contenedores?: Contenedor[];
  EstanciaPunto?: Estancia;
}
