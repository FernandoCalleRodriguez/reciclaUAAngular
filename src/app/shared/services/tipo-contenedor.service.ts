import {Injectable} from '@angular/core';
import {Contenedor, TipoContenedor} from '../models/contenedor';

@Injectable({
  providedIn: 'root'
})
export class TipoContenedorService {
  public tipos: TipoContenedor[] = [
    {
      Id: 1,
      Tipo: 'Papel',
      RGB: 'rgb(0,92,189)'
    },
    {
      Id: 2,
      Tipo: 'Cristal',
      RGB: 'rgb(46,171,78)'
    },
    {
      Id: 3,
      Tipo: 'Plástico',
      RGB: 'rgb(242,242,19)'
    },
    {
      Id: 4,
      Tipo: 'Orgánico',
      RGB: 'rgb(145,142,139)'
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
