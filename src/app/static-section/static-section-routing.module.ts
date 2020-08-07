import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';


import { SampleFormComponent } from './sample-form.component';

const routes: Routes = [
  { path: 'static-section/sampleForm', component: SampleFormComponent },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StaticSectionRoutingModule { }
