import { RespuestaService } from './../../shared/services/respuesta.service';
import { DudaService } from './../../shared/services/duda.service';
import { Component, OnInit } from '@angular/core';
import { Color } from 'ng2-charts';

@Component({
  selector: 'app-foro-chart',
  templateUrl: './foro-chart.component.html',
  styleUrls: ['./foro-chart.component.css']
})
export class ForoChartComponent implements OnInit {
  public pieChartColors = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', '007bff'],
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
  constructor(private respuesetaService:RespuestaService,private dudaService: DudaService) { }

  ngOnInit(): void {
    this.dudaService.getAllDudas().subscribe(res => {
      this.barChartData[0].data.push(res.length)
      this.barChartLabels.push("dudas")
    })
    this.respuesetaService.getAllRespuestas().subscribe(res => {
      this.barChartData[0].data.push(res.length)
      this.barChartLabels.push("respuestas")
    })
  }

}
