import { TipoContenedorService } from './../../shared/services/tipo-contenedor.service';
import { ContenedorService } from './../../shared/services/contenedor.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-puntos-chart',
  templateUrl: './puntos-chart.component.html',
  styleUrls: ['./puntos-chart.component.css']
})
export class PuntosChartComponent implements OnInit {

  public pieChartColors = [
    {
      backgroundColor: ['rgb(0, 111, 230)','rgb(40, 167, 69)' ,'rgb(255, 255, 17)','rgb(221, 221, 221)'],
    },
  ];
  public barChartOptions = {

    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,

        },
      }]
    },
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels = [];
  public barChartType = 'pie';
  public barChartLegend = true;
  public barChartData = [
    { data: [], label: 'Foro' },
  ];
  constructor(private contenedorService: ContenedorService, private tipoContenedorService: TipoContenedorService) { }

  ngOnInit(): void {
    this.tipoContenedorService.getTipos().forEach(tipo => {
      console.log("tipo", tipo.Id)
      this.contenedorService.buscarPorTipo(tipo.Id).subscribe(res => {
        if (res) {
        this.barChartData[0].data.push(res.length)
          this.barChartLabels.push(tipo.Tipo)
        }
      })

    });
    // this.respuesetaService.getAllRespuestas().subscribe(res => {
    //   this.barChartData[0].data.push(res.length)
    //   this.barChartLabels.push("respuestas")
    // })
  }
}
