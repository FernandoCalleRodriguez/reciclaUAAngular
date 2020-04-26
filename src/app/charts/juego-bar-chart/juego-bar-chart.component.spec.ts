import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JuegoBarChartComponent } from './juego-bar-chart.component';

describe('JuegoBarChartComponent', () => {
  let component: JuegoBarChartComponent;
  let fixture: ComponentFixture<JuegoBarChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JuegoBarChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JuegoBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
