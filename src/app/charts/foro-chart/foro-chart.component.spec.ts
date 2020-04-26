import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForoChartComponent } from './foro-chart.component';

describe('ForoChartComponent', () => {
  let component: ForoChartComponent;
  let fixture: ComponentFixture<ForoChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForoChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForoChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
