import {Injectable} from '@angular/core';
import {Contenedor, TipoContenedor} from '../models/contenedor';

@Injectable({
  providedIn: 'root'
})
export class TipoContenedorService {
  public tipos: TipoContenedor[] = [
    {
      Id: 1,
      Tipo: 'Papel'
    },
    {
      Id: 2,
      Tipo: 'Cristal'
    },
    {
      Id: 3,
      Tipo: 'Plástico'
    },
    {
      Id: 4,
      Tipo: 'Orgánico'
    },
  ];

  constructor() {
  }

  public getTipoById(id: number): TipoContenedor {
    return this.tipos.find(t => t.Id === id);
  }

  public getTipos(): TipoContenedor[] {
    return this.tipos;
  }
}
