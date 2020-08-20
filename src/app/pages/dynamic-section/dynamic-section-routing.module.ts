import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'app-section',
    loadChildren: () => import('./app-section/app-section.module').then((m) => m.AppSectionModule),
  },
  {
    path: 'tab-section',
    loadChildren: () => import('./tab-section/tab-section.module').then((m) => m.TabSectionModule),
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DynamicSectionsModule { }
