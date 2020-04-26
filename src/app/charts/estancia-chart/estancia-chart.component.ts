import { EdificioService } from './../../shared/services/edificio.service';
import { EstanciaService } from './../../shared/services/estancia.service';
import { Component, OnInit } from '@angular/core';
import { Color } from 'ng2-charts';

@Component({
  selector: 'app-estancia-chart',
  templateUrl: './estancia-chart.component.html',
  styleUrls: ['./estancia-chart.component.css']
})
export class EstanciaChartComponent implements OnInit {

  public barChartColors: Color[] = [
    { backgroundColor: '#007bff' },
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
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [
    { data: [], label: 'Estancias' },
  ];
  constructor(private edificioService:EdificioService,private estanciaService:EstanciaService) { }

  ngOnInit(): void {
    this.estanciaService.getEstancia().subscribe(res => {
      this.barChartData[0].data.push(res.length)
      this.barChartLabels.push("estancia")
    })
    this.edificioService.getEdificio().subscribe(res => {
      this.barChartData[0].data.push(res.length)
      this.barChartLabels.push("edificios")
    })
  }

}
