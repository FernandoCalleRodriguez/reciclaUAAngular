import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDudaComponent } from './form-respuesta.component';

describe('FormDudaComponent', () => {
  let component: FormDudaComponent;
  let fixture: ComponentFixture<FormDudaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormDudaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDudaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
