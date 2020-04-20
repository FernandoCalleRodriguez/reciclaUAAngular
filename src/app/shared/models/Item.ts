import { Nivel } from './Nivel';
import { Material } from './Material';
 import { Usuario } from './usuario';
import { Estado } from './estado';
  export class Item {
    Id: number;
    Nombre: string;
    Descripcion: string;
    Imagen: string;
    EsValido: Estado;
    Usuario_oid:number;
    Material_oid:number;
    MaterialItem:Material
}


