import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NonProductspecifcpitchcreationComponent } from './non-productspecifcpitchcreation.component';

describe('NonProductspecifcpitchcreationComponent', () => {
  let component: NonProductspecifcpitchcreationComponent;
  let fixture: ComponentFixture<NonProductspecifcpitchcreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NonProductspecifcpitchcreationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NonProductspecifcpitchcreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
