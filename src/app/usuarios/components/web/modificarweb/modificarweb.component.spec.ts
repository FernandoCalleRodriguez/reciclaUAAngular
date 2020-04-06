import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarwebComponent } from './modificarweb.component';

describe('ModificarwebComponent', () => {
  let component: ModificarwebComponent;
  let fixture: ComponentFixture<ModificarwebComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificarwebComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarwebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
