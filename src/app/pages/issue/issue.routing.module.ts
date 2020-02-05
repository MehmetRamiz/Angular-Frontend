import { NgModule } from '@angular/core';
import { IssueComponent } from './issue.component';
import { RouterModule, Routes, Router } from '@angular/router';
import { IssueDetailComponent } from './issue-detail/issue-detail.component';


const routes: Routes = [
 {
   path:'',
   component:IssueComponent
 },
 {
  path: 'issue-detail/:id',  component: IssueDetailComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes) ],
  exports: [RouterModule]
})
export class IssueRoutingModule { }
