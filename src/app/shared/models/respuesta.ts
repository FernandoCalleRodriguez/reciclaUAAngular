import {Usuario} from './usuario';

export class Respuesta {
  Id?: number;
  Cuerpo?: string;
  Fecha?: Date;
  Util?: number;
  EsCorrecta?: boolean;
  UsuarioRespuesta?: Usuario;
  // tslint:disable-next-line:variable-name
  Usuario_oid?: number;
  // tslint:disable-next-line:variable-name
  Duda_oid?: number;
}
