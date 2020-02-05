import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectComponent } from './project.component';
import { ProjectRoutingModule } from './project.routing.module';
import { ProjectService } from 'src/app/services/shared/project.service';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';




@NgModule({
  imports: [
    CommonModule,
    NgxDatatableModule,
    ProjectRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [ProjectService],
  declarations: [ProjectComponent]
})
export class ProjectModule { }
