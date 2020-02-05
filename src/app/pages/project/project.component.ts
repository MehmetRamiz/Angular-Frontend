import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ProjectService } from 'src/app/services/shared/project.service';
import {Page} from "../../common/page";
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ConfirmationComponent } from 'src/app/shared/confirmation/confirmation.component';
import { UserService } from 'src/app/services/shared/user.service';



@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
})
export class ProjectComponent implements OnInit {

  modalRef: BsModalRef;
  projectForm: FormGroup;

  @ViewChild('tplProjectDeleteCell', {static: true}) tplProjectDeleteCell: TemplateRef<any>;

  page = new Page();
  cols = [];
  rows = [];
  managerOptions=[];

  constructor(private projectService :ProjectService,
    private modalService: 
    BsModalService,
    private formbuilder: FormBuilder,
    private userService: UserService
    ) {
   }

  ngOnInit() {
    this.cols = [
    {prop: 'id', name: 'No'},
    {prop: 'projectName', name: 'Project Name', sortable: false},
    {prop: 'projectCode', name: 'Project Code', sortable: false},
    {prop: 'manager.nameSurname', name: 'Manager', sortable: false},
    {prop: 'id', name: 'Actions', cellTemplate: this.tplProjectDeleteCell, flexGrow: 1, sortable: false}
    ];

    this.setPage({ offset: 0});

    this.projectForm = this.formbuilder.group({
      'projectCode':[null, [Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
      'projectName': [null, [Validators.required, Validators.minLength(4)]],
      'managerId': [null, [Validators.required]]
    })

       this.userService.getAll().subscribe(res => {
        this.managerOptions = res;
        console.log(res);
     })
  }

  get f() {
    return this.projectForm.controls
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  saveProject(){
    if (!this.projectForm.valid)
      return;

    this.projectService.createProject(this.projectForm.value).subscribe(
      response => {
        this.setPage({offset: 0});
        this.closeAndResetModal();
      }
    )
  }

  closeAndResetModal() {
    this.projectForm.reset();
    this.modalRef.hide();
  }

  

  setPage(pageInfo) {
    this.page.page=pageInfo.offset;
    this.projectService.getAllPageable(this.page).subscribe(pagedData => {
      this.page.size = pagedData.size;
      this.page.page = pagedData.page;
      this.page.totalElements = pagedData.totalElements;
      this.rows = pagedData.content;
      
    });
  }

  showProjectDeleteConfirmation(value): void {
    const modal = this.modalService.show(ConfirmationComponent);
    (<ConfirmationComponent>modal.content).showConfirmation(
      'Delete Confirmation',
      'Are you sure for delete Project'
    );

    (<ConfirmationComponent>modal.content).onClose.subscribe(result => {
      if (result === true) {
        this.projectService.delete(value).subscribe(response => {
          if (response === true) {
            this.setPage({offset: 0})
          }
        });
      } else if (result === false) {
      }
    }
  );
  }


}
