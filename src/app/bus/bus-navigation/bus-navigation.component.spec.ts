import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusNavigationComponent } from './bus-navigation.component';

describe('BusNavigationComponent', () => {
  let component: BusNavigationComponent;
  let fixture: ComponentFixture<BusNavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusNavigationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
