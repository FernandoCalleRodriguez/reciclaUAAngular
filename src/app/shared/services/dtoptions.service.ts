import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DtoptionsService {
  dtOptions: DataTables.Settings = {};

  constructor() {
  }

  getDtoptions(nombre) {

    return this.dtOptions = {
      language: {
        decimal: '',
        emptyTable: 'No hay ' + nombre + ' disponibles en la tabla',
        info: 'Mostrando _START_ hasta _END_ de _TOTAL_ ' + nombre + ' en total',
        infoEmpty: 'Mostrando 0 hasta 0 de 0 ' + nombre,
        infoFiltered: '(filtrado de _MAX_ items en total)',
        infoPostFix: '',
        thousands: ',',
        lengthMenu: 'Mostar _MENU_ ' + nombre + ' por página',
        loadingRecords: 'Cargando...',
        processing: 'Procesando...',
        search: 'Buscar: ',
        zeroRecords: 'No se encontraron ' + nombre,
        paginate: {
          first: 'Primero',
          last: 'Último',
          next: 'Siguiente',
          previous: 'Anterior'
        },
        aria: {
          sortAscending: ': activar ordenamiento de columnas ascendentemente',
          sortDescending: ': activar ordenamiento de columnas descendentemente'
        }
      }
    };
  }
}
