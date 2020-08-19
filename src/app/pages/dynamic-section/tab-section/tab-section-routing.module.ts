import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppSectionResolver } from '../../../app-communication/resolver/app-section-resolver.service';
import { SectionRendererComponent } from '../section-renderer/section-renderer.component';
import { TabSectionComponent } from './tab-section.component';

const routes: Routes = [
  {
    path: 'tab-section',
    component: TabSectionComponent,
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
export class TabSectionPageRoutingModule { }
