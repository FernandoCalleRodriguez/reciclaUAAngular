import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearwebComponent } from './crearweb.component';

describe('CrearwebComponent', () => {
  let component: CrearwebComponent;
  let fixture: ComponentFixture<CrearwebComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearwebComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearwebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
