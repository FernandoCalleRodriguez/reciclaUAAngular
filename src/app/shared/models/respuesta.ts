import {Usuario} from './usuario';

export class Respuesta {
  Id?: number;
  Cuerpo?: string;
  Fecha?: Date;
  Util?: boolean;
  EsCorrecta?: boolean;
  UsuarioRespuesta?: Usuario;
}
