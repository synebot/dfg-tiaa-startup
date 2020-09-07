import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { DynamicFormModule } from 'dfg-dynamic-form';
import { MaterialModule } from '../../shared/material.module';
import { FormDesignerDashboardComponent } from './components/dashboard/form-designer-dashbooard.component';
import { FormDesignerUpdatedComponent } from './components/designer-updated/form-designer-updated.component';
import { FormDesignerComponent } from './components/designer/form-designer.component';
import { FormDesignerRoutingModule } from './form-designer-routing.component';
import { FormDesignerService } from './service/form-designer.service';

import { AngularSplitModule } from 'angular-split';

/**
 * Developer : Onkar Kulkarni
 */

@NgModule({
  declarations: [
    FormDesignerComponent,
    FormDesignerDashboardComponent,
    FormDesignerUpdatedComponent,
  ],
  entryComponents: [
    FormDesignerComponent,
  ],
  exports: [
    FormDesignerComponent,
    FormDesignerDashboardComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormDesignerRoutingModule,
    DynamicFormModule,
    FormsModule,
    AngularSplitModule.forRoot(),
  ],
  providers: [
    FormDesignerService,
  ],
})
export class FormDesignerModule { }
