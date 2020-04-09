import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListwebComponent } from './listweb.component';

describe('ListwebComponent', () => {
  let component: ListwebComponent;
  let fixture: ComponentFixture<ListwebComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListwebComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListwebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
