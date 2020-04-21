import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormUsuarioModalComponent } from './form-usuario-modal.component';

describe('FormUsuarioComponent', () => {
  let component: FormUsuarioModalComponent;
  let fixture: ComponentFixture<FormUsuarioModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormUsuarioModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormUsuarioModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
