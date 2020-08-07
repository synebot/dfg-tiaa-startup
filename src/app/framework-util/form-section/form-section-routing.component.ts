import { NgModule             } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule         } from '@angular/common';

import { AppSectionResolver             } from '../../app-communication/resolver/app-section-resolver.service';

import { FormSectionDashboardComponent  } from './components/dashboard/form-section-dashbooard.component';
import { FormSectionComponent           } from './components/section/form-section.component';


/**
 * Developer : Onkar Kulkarni
 */

const routes: Routes = [
  {
    path: 'form-section/dashboard',
    component: FormSectionDashboardComponent,
    resolve: {
    sections : AppSectionResolver }
  },
  {
    path: 'form-section/formSection',
    component: FormSectionComponent,
    resolve: {
    sections : AppSectionResolver }
  },
  {
    path: 'form-section/formSection/:id',
    component: FormSectionComponent,
    resolve: {
      sections : AppSectionResolver }
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AppSectionResolver]
})
export class FormSectionRoutingModule { }
