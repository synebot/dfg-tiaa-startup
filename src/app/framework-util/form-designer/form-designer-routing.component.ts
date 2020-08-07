import { NgModule             } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule         } from '@angular/common';

import { FormDesignerComponent          } from './components/designer/form-designer.component';
import { FormDesignerDashboardComponent } from './components/dashboard/form-designer-dashbooard.component';
import { AppSectionResolver             } from '../../app-communication/resolver/app-section-resolver.service';

/**
 * Developer : Onkar Kulkarni
 */

const routes: Routes = [
  {
    path: 'form-designer/dashboard',
    component: FormDesignerDashboardComponent,
    resolve: {
      sections : AppSectionResolver }
  },
  {
    path: 'form-designer/formDesigner',
    component: FormDesignerComponent,
    resolve: {
      sections : AppSectionResolver }
  },
  {
    path: 'form-designer/formDesigner/:id',
    component: FormDesignerComponent,
    resolve: {
      sections : AppSectionResolver }
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AppSectionResolver]
})
export class FormDesignerRoutingModule { }
