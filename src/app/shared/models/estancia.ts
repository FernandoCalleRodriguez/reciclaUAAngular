import { Planta } from './planta';
import { Edificio } from './edificio';
export class Estancia {
    Id: number;
    Actividad: string;
    Latitud: number;
    Longitud: number;
    Nombre: string;
    Edificio_oid: number;
    Planta_oid: number;
    Puntos_oid: number[];
    EdificioEstancia: Edificio;
    PlantaEstancia: Planta;
}