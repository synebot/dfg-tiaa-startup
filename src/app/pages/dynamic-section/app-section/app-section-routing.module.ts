import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppSectionResolver } from '../../../app-communication/resolver/app-section-resolver.service';
import { SectionRendererComponent } from '../section-renderer/section-renderer.component';
import { AppSectionComponent } from './app-section.component';

const routes: Routes = [
  {
    path: 'app-section',
    component: AppSectionComponent,
    children: [
      {
        path: ':sectionName',
        component: SectionRendererComponent,
        resolve: {
          sections: AppSectionResolver,
        },
      },
      {
        path: ':sectionName/:subSectionName',
        component: SectionRendererComponent,
        resolve: {
          sections: AppSectionResolver,
        },
      },
      {
        path: ':sectionName/:subSectionName/:paramId',
        component: SectionRendererComponent,
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
export class AppSectionPageRoutingModule { }
