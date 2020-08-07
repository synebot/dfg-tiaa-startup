import { NgModule         } from '@angular/core';
import { CommonModule     } from '@angular/common';
import { FormsModule      } from '@angular/forms';

import { FormSectionRoutingModule   } from './form-section-routing.component';
import { MaterialModule             } from '../../shared/material.module';
import { DynamicFormModule          } from 'dfg-dynamic-form';

import { FormSectionDashboardComponent  } from './components/dashboard/form-section-dashbooard.component';
import { FormSectionComponent           } from './components/section/form-section.component';
import { SharedModule                   } from '../../shared/shared.module';
import { FormSectionService             } from './service/form-section.service';


/**
 * Developer : Onkar Kulkarni
 */

@NgModule({
  declarations: [
    FormSectionDashboardComponent,
    FormSectionComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    FormSectionRoutingModule,
    DynamicFormModule,
    MaterialModule,
    SharedModule,
  ],
  providers: [
    FormSectionService
   ]
})
export class FormSectionModule { }
