import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from "@angular/forms";
import { MatProgressButtonOptions } from "mat-progress-buttons";
import { NPSPitchCreationService } from "src/app/services/npspitch-creation.service";

@Component({
  selector: "app-collaborationmanagement",
  templateUrl: "./collaborationmanagement.component.html",
  styleUrls: ["./collaborationmanagement.component.css"],
})
export class CollaborationmanagementComponent implements OnInit {
  isSubmitted: boolean = false;
  _collaborationForm: FormGroup;
  teamInfoJson: any = [];
  grpoupInfoJson: any = [];
  selectedInfo:string='';
  createSpinnerButtonOptions: MatProgressButtonOptions = {
    active: false,
    text: "Create",
    spinnerSize: 18,
    raised: true,
    stroked: false,
    buttonColor: "primary",
    spinnerColor: "accent",
    fullWidth: false,
    disabled: false,
    mode: "indeterminate",
    // buttonIcon: {
    //   fontIcon: 'add'
    // }
  };
  cancelSpinnerButtonOptions: MatProgressButtonOptions = {
    active: false,
    text: "Cancel",
    spinnerSize: 18,
    raised: true,
    stroked: false,
    buttonColor: "primary",
    spinnerColor: "accent",
    fullWidth: false,
    disabled: false,
    mode: "indeterminate",
    // buttonIcon: {
    //   fontIcon: 'add'
    // }
  };
  teamInfoDropdownSettings: any = {};
  groupInfoDropdownSettings: any = {};
  constructor(
    private formBuilder: FormBuilder,
    private createPitchService: NPSPitchCreationService
  ) {
    this.grpoupInfoJson=[{
      description:"ABF Complience",
      groupName:"abf_comp_grp",
      groups_names:""
    },
    {
      description:"ABF Complience1",
      groupName:"abf_comp_grp1",
      groups_names:""
    },
    {
      description:"ABF Complience2",
      groupName:"abf_comp_grp2",
      groups_names:""
    },
    {
      description:"ABF Complience3",
      groupName:"abf_comp_grp3",
      groups_names:""
    },
    {
      description:"ABF Complience4",
      groupName:"abf_comp_grp4",
      groups_names:""
    },
  ]
  this.grpoupInfoJson.map(x=>{
    x.description= x.groupName + ' [' + x.description+ ']';
  })
    this.initForm();
  }

  ngOnInit(): void {
    this.teamInfoDropdownSettings = {
      text: "Select Team Info",
      selectAllText: "Select All",
      unSelectAllText: "UnSelect All",
      enableCheckAll: false,
      labelKey: "userName",
      primaryKey: "userLoginName",
      enableSearchFilter: true,
      classes: "myclass custom-class",
    };
    this.groupInfoDropdownSettings = {
      text: "Select Group Info",
      selectAllText: "Select All",
      unSelectAllText: "UnSelect All",
      enableCheckAll: false,
      labelKey: "description",
      primaryKey: "groupName",
      enableSearchFilter: true,
      classes: "myclass custom-class",
    };
    this.createPitchService.getUsersList().subscribe((result) => {
      console.log("res = " + result);
      // this.userListJson=result;
      this.teamInfoJson = result["users"];
    });
  }
  initForm() {
    this._collaborationForm = new FormGroup({
      FolderName: new FormControl("", Validators.required),
      TeamInfo: new FormControl("", Validators.required),
      GroupInfo: new FormControl("", Validators.required),
    });
  }
  get f() {
    return this._collaborationForm.controls;
  }

  infoChange(info){
this.selectedInfo=info;
this.f.TeamInfo.setValue('');
this.f.GroupInfo.setValue('');
  }

  createCollaboration() {
    if (this._collaborationForm.invalid) {
      this.isSubmitted = true;

      this._collaborationForm.markAllAsTouched();
      return;
    }
  }

  cancelCollaboration() {
    this._collaborationForm.reset();
    this.initForm();
  }
}
