import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccionreciclarComponent } from './accionreciclar.component';

describe('AccionreciclarComponent', () => {
  let component: AccionreciclarComponent;
  let fixture: ComponentFixture<AccionreciclarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccionreciclarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccionreciclarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
