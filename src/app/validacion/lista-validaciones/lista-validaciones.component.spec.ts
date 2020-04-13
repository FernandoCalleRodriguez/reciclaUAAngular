import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaValidacionesComponent } from './lista-validaciones.component';

describe('ListaValidacionesComponent', () => {
  let component: ListaValidacionesComponent;
  let fixture: ComponentFixture<ListaValidacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaValidacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaValidacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
