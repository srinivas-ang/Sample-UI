import { HttpClientModule } from "@angular/common/http";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import {
  AngularMultiSelect,
  AngularMultiSelectModule,
} from "angular2-multiselect-dropdown";

import { CollaborationmanagementComponent } from "./collaborationmanagement.component";

describe("CollaborationmanagementComponent", () => {
  let component: CollaborationmanagementComponent;
  let fixture: ComponentFixture<CollaborationmanagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        HttpClientModule,
        AngularMultiSelectModule,
      ],
      declarations: [CollaborationmanagementComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollaborationmanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("get folder name with value", () => {
    component.f.FolderName.setValue("My Folder");
    expect(component.f.FolderName.value).toEqual("My Folder");
  });

  it("get folder name with empty", () => {
    expect(component.f.FolderName.value).toEqual("");
  });

});
