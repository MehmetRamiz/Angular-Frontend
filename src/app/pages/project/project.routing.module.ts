import { NgModule } from '@angular/core';
import { ProjectComponent } from './project.component';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component:ProjectComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)  ],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }
