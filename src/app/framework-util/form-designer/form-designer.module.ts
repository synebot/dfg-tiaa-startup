import { NgModule         } from '@angular/core';
import { CommonModule     } from '@angular/common';
import { FormsModule      } from '@angular/forms';

import { FormDesignerRoutingModule      } from './form-designer-routing.component';
import { MaterialModule                 } from '../../shared/material.module';
import { DynamicFormModule              } from 'dfg-dynamic-form';
import { FormDesignerComponent          } from './components/designer/form-designer.component';
import { FormDesignerDashboardComponent } from './components/dashboard/form-designer-dashbooard.component';
import { FormDesignerService            } from './service/form-designer.service';

/**
 * Developer : Onkar Kulkarni
 */

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormDesignerRoutingModule,
    DynamicFormModule,
    FormsModule
  ],
  declarations: [
    FormDesignerComponent,
    FormDesignerDashboardComponent
  ],
  exports: [
    FormDesignerComponent,
    FormDesignerDashboardComponent
  ],
  providers: [
    FormDesignerService
  ],
  entryComponents: [
    FormDesignerComponent
  ]
})
export class FormDesignerModule { }
