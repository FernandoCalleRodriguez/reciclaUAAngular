import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTipoaccionComponent } from './form-tipoaccion.component';

describe('FormTipoaccionComponent', () => {
  let component: FormTipoaccionComponent;
  let fixture: ComponentFixture<FormTipoaccionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormTipoaccionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormTipoaccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
