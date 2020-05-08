import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PuntosChartComponent } from './puntos-chart.component';

describe('PuntosChartComponent', () => {
  let component: PuntosChartComponent;
  let fixture: ComponentFixture<PuntosChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PuntosChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PuntosChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
