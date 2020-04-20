import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalNotaComponent } from './modal-nota.component';

describe('ModalNotaComponent', () => {
  let component: ModalNotaComponent;
  let fixture: ComponentFixture<ModalNotaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalNotaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalNotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
