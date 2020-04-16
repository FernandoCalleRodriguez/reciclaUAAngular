import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRespuestaModalComponent } from './form-respuesta-modal.component';

describe('FormRespuestaModalComponent', () => {
  let component: FormRespuestaModalComponent;
  let fixture: ComponentFixture<FormRespuestaModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormRespuestaModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormRespuestaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
