import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollaborationmanagementComponent } from './collaborationmanagement.component';

describe('CollaborationmanagementComponent', () => {
  let component: CollaborationmanagementComponent;
  let fixture: ComponentFixture<CollaborationmanagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollaborationmanagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollaborationmanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
