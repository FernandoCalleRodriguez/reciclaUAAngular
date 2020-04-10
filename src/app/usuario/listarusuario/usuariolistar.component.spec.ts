import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariolistarComponent } from './usuariolistar.component';

describe('UsuariolistarComponent', () => {
  let component: UsuariolistarComponent;
  let fixture: ComponentFixture<UsuariolistarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuariolistarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuariolistarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
