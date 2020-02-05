import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ModalModule, BsModalRef } from 'ngx-bootstrap';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ModalModule.forRoot()
  ],
  providers: [BsModalRef],
  declarations: [
    ConfirmationComponent
    
  ],
  entryComponents: [
    ConfirmationComponent
  ],
  exports: [
    TranslateModule,
    ModalModule,
    ReactiveFormsModule,
    ConfirmationComponent
    
  ]
})
export class SharedModule { }
