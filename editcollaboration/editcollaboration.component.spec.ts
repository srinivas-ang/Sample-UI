import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditcollaborationComponent } from './editcollaboration.component';

describe('EditcollaborationComponent', () => {
  let component: EditcollaborationComponent;
  let fixture: ComponentFixture<EditcollaborationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditcollaborationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditcollaborationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
