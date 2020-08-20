import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppSectionResolver             } from '../app-communication/resolver/app-section-resolver.service';
import { TabSectionResolver             } from '../app-communication/resolver/tab-section-resolver.service';
import { AppSectionRenderComponent      } from './components/section-render.component';
import { AppSectionTemplateComponent    } from './components/section-template.component';
import { TabSectionTemplateComponent    } from './components/tab-section-template.component';

const routes: Routes = [
    {
        path: 'app-section',
        // tslint:disable-next-line: object-literal-sort-keys
        component: AppSectionTemplateComponent,
        resolve: {
            sections : AppSectionResolver,
        },
        children : [
            {
                path: ':sectionName',
                component: AppSectionRenderComponent,
                resolve: {
                    sections : AppSectionResolver,
                },
            },
            {
                path: ':sectionName/:subSectionName',
                component: AppSectionRenderComponent,
                resolve: {
                    sections : AppSectionResolver,
                },
            },
            {
                path: ':sectionName/:subSectionName/:paramId',
                component: AppSectionRenderComponent,
                resolve: {
                    sections : AppSectionResolver,
                },
            },
        ],
    },
    {
        path: 'tab-section/:sectionName',
        component: TabSectionTemplateComponent,
        children : [
            {
                path: ':sectionName',
                component: AppSectionRenderComponent,
                resolve: {
                    sections : TabSectionResolver,
                },
            },
            {
                path: ':sectionName/:subSectionName',
                component: AppSectionRenderComponent,
                resolve: {
                    sections : TabSectionResolver,
                },
            },
            {
                path: ':sectionName/:subSectionName/:paramId',
                component: AppSectionRenderComponent,
                resolve: {
                    sections : TabSectionResolver,
                },
            },
        ],
    },
];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [AppSectionResolver, TabSectionResolver],
})

export class AppSectionRoutingModule {}
