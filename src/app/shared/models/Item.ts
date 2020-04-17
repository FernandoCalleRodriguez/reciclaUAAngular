import { Material } from './Material';
 import { Usuario } from './usuario';
import { Estado } from './Estado';
  export class Item {
    Id: number;
    Nombre: string;
    Descripcion: string;
    Imagen: string;
    EsValido: Estado;
    Usuario_oid:number;
    Niveles_oid:number;
    Material_oid:number;
    MaterialItem:Material
}


