import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidarElementoComponent } from './validar-elemento.component';

describe('ValidarElementoComponent', () => {
  let component: ValidarElementoComponent;
  let fixture: ComponentFixture<ValidarElementoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidarElementoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidarElementoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
