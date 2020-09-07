import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppSectionResolver } from '../../app-communication/resolver/app-section-resolver.service';
import { FormDesignerDashboardComponent } from './components/dashboard/form-designer-dashbooard.component';
import { FormDesignerUpdatedComponent } from './components/designer-updated/form-designer-updated.component';
import { FormDesignerComponent } from './components/designer/form-designer.component';

/**
 * Developer : Onkar Kulkarni
 */

const routes: Routes = [
  {
    path: 'form-designer/dashboard',
    component: FormDesignerDashboardComponent,
    resolve: {
      sections: AppSectionResolver,
    },
  },
  {
    path: 'form-designer/formDesigner',
    component: FormDesignerUpdatedComponent,
    resolve: {
      sections: AppSectionResolver,
    },
  },
  {
    path: 'form-designer/formDesigner/:id',
    component: FormDesignerUpdatedComponent,
    resolve: {
      sections: AppSectionResolver,
    },
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AppSectionResolver],
})
export class FormDesignerRoutingModule { }
