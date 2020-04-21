import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRespuestaComponent } from './form-respuesta.component';

describe('FormRespuestaComponent', () => {
  let component: FormRespuestaComponent;
  let fixture: ComponentFixture<FormRespuestaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormRespuestaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormRespuestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
