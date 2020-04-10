import {Usuario} from './usuario';

export class Respuesta {
  Id?: number;
  Cuerpo?: string;
  Fecha?: Date;
  Util?: number;
  EsCorrecta?: boolean;
  UsuarioRespuesta?: Usuario;
}
