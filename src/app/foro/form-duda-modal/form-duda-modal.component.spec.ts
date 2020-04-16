import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDudaModalComponent } from './form-duda-modal.component';

describe('FormDudaModalComponent', () => {
  let component: FormDudaModalComponent;
  let fixture: ComponentFixture<FormDudaModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormDudaModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDudaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
