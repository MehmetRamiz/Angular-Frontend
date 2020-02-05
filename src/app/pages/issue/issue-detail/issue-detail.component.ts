import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IssueService } from 'src/app/services/shared/issue.service';
import { ProjectService } from 'src/app/services/shared/project.service';
import { UserService } from 'src/app/services/shared/user.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-issue-detail',
  templateUrl: './issue-detail.component.html',
  styleUrls: ['./issue-detail.component.css']
})
export class IssueDetailComponent implements OnInit {

  @ViewChild('tplDateCell', {static: true}) tplDateCell: TemplateRef<any>;

  issueDetailForm: FormGroup;

  id: number;
  private sub: any;

  datatable_rows=[];
  columns=[];
  projectOptions =[];
  issueStatusOptions=[];
  assigneeOptions=[];


  constructor(private route: ActivatedRoute,
    private issueService: IssueService,
    private projectService: ProjectService,
    private userService: UserService,
    private formBuilder: FormBuilder) {

     }

  ngOnInit() {

    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.loadIssueDetails();
    });


    this.columns = [
      {prop: 'id', name: 'No', maxWidth: 40},
      {prop: 'description', name: 'Description'},
      {prop: 'date', name: 'Issue Date', cellTemplate: this.tplDateCell },
      {prop: 'issueStatus', name: 'IssueStatus'},
      {prop: 'assignee.nameSurname', name: 'Assignee'},
      {prop: 'issue.project.projectName', name: 'Project Name'},
    ];

    // 1- Project DD dolacak
    this.loadProjects();
    // 2- Assignee DD dolacak
    this.loadAssignees();
    // 3- Issue Status DD dolacak
    this.loadIssueStatuses();

    window.dispatchEvent(new Event('resize'));
  }

  private loadProjects(){
    this.projectService.getAll().subscribe(response => {
      this.projectOptions = response;
      window.dispatchEvent(new Event('resize'));
    })
  }

  private loadAssignees() {
    this.userService.getAll().subscribe(response => {
      this.assigneeOptions=response;
      window.dispatchEvent(new Event('resize'));
    })
  }

  private loadIssueStatuses() {
    this.issueService.getAllIssueStatuses().subscribe(response => {
      this.issueStatusOptions=response;
      window.dispatchEvent(new Event('resize'));
    });
  }

  private loadIssueDetails(){
   this.issueService.getByIdWithDetails(this.id).subscribe(response => {
    this.issueDetailForm = this.createIssueDetailFormGroup(response);
     this.datatable_rows=response['issueHistories'];
     window.dispatchEvent(new Event('resize'));
   })
  }

  createIssueDetailFormGroup(response) {
    return this.formBuilder.group({
      id: response['id'],
      description: response['description'],
      details: response['details'],
      date: this.fromJsonDate(response['date']),
      issueStatus: response['issueStatus'],
      assignee_id: response['assignee']? response['assignee']['id'] : '',
      project_id:  response['project'] ? response['project']['id'] : '', 
      project_manager: response['project'] && response['project']['manager'] ? response['project']['manager']['nameSurname']: '',
    });
  }

  saveIssue(){
    this.issueService.updateIssue(this.issueDetailForm.value).subscribe(response=>{
        console.log(response);
      this.datatable_rows = response['issueHistories'];
    })
  }

  fromJsonDate(jDate): string {
    const bDate: Date = new Date(jDate);
    return bDate.toISOString().substring(0, 10);
  }
  


}
