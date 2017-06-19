import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenReportComponent } from './open-report.component';

describe('OpenReportComponent', () => {
  let component: OpenReportComponent;
  let fixture: ComponentFixture<OpenReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
