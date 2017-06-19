import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DamageLocationComponent } from './damage-location.component';

describe('DamageLocationComponent', () => {
  let component: DamageLocationComponent;
  let fixture: ComponentFixture<DamageLocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DamageLocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DamageLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
