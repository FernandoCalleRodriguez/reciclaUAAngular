import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstanciaComponent } from "./estancia.component";

describe('EstanciaComponent', () => {
  let component: EstanciaComponent;
  let fixture: ComponentFixture<EstanciaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstanciaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstanciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
