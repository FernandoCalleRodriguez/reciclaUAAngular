import {Usuario} from './usuario';

export class Duda {
  Id?: number;
  Titulo?: string;
  Cuerpo?: string;
  Fecha?: Date;
  Util?: boolean;
  Tema?: number;
  UsuarioDuda?: Usuario;
  // tslint:disable-next-line:variable-name
  Usuario_oid?: number;
}
