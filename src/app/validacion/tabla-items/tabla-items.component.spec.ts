import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaItemsComponent } from './tabla-items.component';

describe('TablaItemsComponent', () => {
  let component: TablaItemsComponent;
  let fixture: ComponentFixture<TablaItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
