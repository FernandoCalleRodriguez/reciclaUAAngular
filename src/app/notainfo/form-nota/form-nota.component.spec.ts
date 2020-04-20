import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormNotaComponent } from './form-nota.component';

describe('FormNotaComponent', () => {
  let component: FormNotaComponent;
  let fixture: ComponentFixture<FormNotaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormNotaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormNotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
