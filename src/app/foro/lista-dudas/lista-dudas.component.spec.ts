import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaDudasComponent } from './lista-dudas.component';

describe('ListaDudasComponent', () => {
  let component: ListaDudasComponent;
  let fixture: ComponentFixture<ListaDudasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaDudasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaDudasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
