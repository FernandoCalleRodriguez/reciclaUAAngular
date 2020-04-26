import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstanciaChartComponent } from './estancia-chart.component';

describe('EstanciaChartComponent', () => {
  let component: EstanciaChartComponent;
  let fixture: ComponentFixture<EstanciaChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstanciaChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstanciaChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
