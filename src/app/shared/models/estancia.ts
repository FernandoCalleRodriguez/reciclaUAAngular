export class Estancia {
    Id?: string;
    Actividad?: string;
    Latitud?: number;
    Longitud?: number;
    Nombre?: string;
    EdificioEstancia?: Edificio;
    PlantaEstancia?: Planta;
}

export class Edificio {
  Id?: number;
  Nombre?: string;
}

export class Planta {
  Id?: number;
  Planta?: number;
}

export class PlantaEnum {
  Id?: number;
  Planta?: string;
}
