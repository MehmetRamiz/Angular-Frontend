import { Component, OnInit, TemplateRef } from '@angular/core';
import { IssueService } from 'src/app/services/shared/issue.service';
import { Page } from 'src/app/common/page';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ProjectService } from 'src/app/services/shared/project.service';

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.css']
})
export class IssueComponent implements OnInit {

  modalRef:BsModalRef
  
  page = new Page();
  rows = [];
  projectOptions=[]

  issueForm: FormGroup;

  constructor(private issueservice: IssueService,
              private modalService:BsModalService,
              private formBuilder: FormBuilder,
              private projectService: ProjectService ){ }


  ngOnInit() {
 
    this.issueForm=this.formBuilder.group({
      projectId:[null, [Validators.required]],
      description:[null, [Validators.required]]
    })
    
  
    this.loadProjects();

    this.setPage({offset: 0});
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  closeAndResetModal() {
    this.issueForm.reset();
    this.modalRef.hide();
  }

  loadProjects(){
    this.projectService.getAll().subscribe(response=>{
      this.projectOptions=response;
    }
    )
  }

  get f() {
    return this.issueForm.controls
  }

  saveIssue(){
    this.issueservice.createIssue(this.issueForm.value).subscribe( 
      resp=>{
        this.setPage({offset: 0});
        this.closeAndResetModal();
      }
    );
  }
  

  setPage(pageInfo) {
    this.page.page=pageInfo.offset;
    this.issueservice.getAll(this.page).subscribe(pagedData => {
      this.page.size = pagedData.size;
      this.page.page = pagedData.page;
      this.page.totalElements = pagedData.totalElements;
      this.rows = pagedData.content;
      
    });
  }

}
