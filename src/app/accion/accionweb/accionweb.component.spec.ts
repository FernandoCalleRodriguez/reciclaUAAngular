import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccionwebComponent } from './accionweb.component';

describe('AccionwebComponent', () => {
  let component: AccionwebComponent;
  let fixture: ComponentFixture<AccionwebComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccionwebComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccionwebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
