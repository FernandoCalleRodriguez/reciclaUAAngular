import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariowebComponent } from './usuarioweb.component';

describe('UsuariowebComponent', () => {
  let component: UsuariowebComponent;
  let fixture: ComponentFixture<UsuariowebComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuariowebComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuariowebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
