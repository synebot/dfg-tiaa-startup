import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppSectionResolver } from 'src/app/app-communication/resolver/app-section-resolver.service';
import { AppSectionComponent } from 'src/app/pages/dynamic-section/app-section/app-section.component';
import { ChangeFromComponent } from './change-from.component';

const routes: Routes = [
  {
    path: 'app-section',
    component: AppSectionComponent,
    children: [
      {
        path: 'changeFrom',
        component: ChangeFromComponent,
        resolve: {
          sections: AppSectionResolver,
        },
      },
      {
        path: 'changeTo',
        component: ChangeFromComponent,
        resolve: {
          sections: AppSectionResolver,
        },
      },
    ],
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChangeFromPageRoutingModule { }
