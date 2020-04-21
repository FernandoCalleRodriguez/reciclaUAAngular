import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaPuntosComponent } from './tabla-puntos.component';

describe('TablaPuntosComponent', () => {
  let component: TablaPuntosComponent;
  let fixture: ComponentFixture<TablaPuntosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaPuntosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaPuntosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
