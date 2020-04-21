import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoaccionComponent } from './tipoaccion.component';

describe('TipoaccionComponent', () => {
  let component: TipoaccionComponent;
  let fixture: ComponentFixture<TipoaccionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoaccionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoaccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
