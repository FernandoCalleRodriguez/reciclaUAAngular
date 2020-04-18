import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaMaterialesComponent } from './tabla-materiales.component';

describe('TablaMaterialesComponent', () => {
  let component: TablaMaterialesComponent;
  let fixture: ComponentFixture<TablaMaterialesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaMaterialesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaMaterialesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
