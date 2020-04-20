import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalTipoaccionComponent } from './modal-tipoaccion.component';

describe('ModalTipoaccionComponent', () => {
  let component: ModalTipoaccionComponent;
  let fixture: ComponentFixture<ModalTipoaccionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalTipoaccionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalTipoaccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
