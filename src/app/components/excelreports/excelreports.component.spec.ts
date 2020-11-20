import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcelreportsComponent } from './excelreports.component';

describe('ExcelreportsComponent', () => {
  let component: ExcelreportsComponent;
  let fixture: ComponentFixture<ExcelreportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExcelreportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExcelreportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
