import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditactioncreationComponent } from './creditactioncreation.component';

describe('CreditactioncreationComponent', () => {
  let component: CreditactioncreationComponent;
  let fixture: ComponentFixture<CreditactioncreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreditactioncreationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditactioncreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('check client name is test', () => {
    component.f.ClientName.setValue("test");
    expect(component.f.ClientName.value).toEqual("test");
  });
  it('check Industry value is test', () => {
    component.f.Industry.setValue("test");
    expect(component.f.Industry.value).toEqual("test");
  });
});
