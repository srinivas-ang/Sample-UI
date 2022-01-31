import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AclsearchComponent } from './aclsearch.component';

describe('AclsearchComponent', () => {
  let component: AclsearchComponent;
  let fixture: ComponentFixture<AclsearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AclsearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AclsearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
