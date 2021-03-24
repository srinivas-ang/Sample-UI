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
});
