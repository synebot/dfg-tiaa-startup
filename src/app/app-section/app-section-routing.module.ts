import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AppSectionTemplateComponent    } from './components/section-template.component';
import { AppSectionRenderComponent      } from './components/section-render.component';
import { AppSectionResolver             } from '../app-communication/resolver/app-section-resolver.service';
import { TabSectionTemplateComponent    } from './components/tab-section-template.component';
import { TabSectionResolver             } from '../app-communication/resolver/tab-section-resolver.service';

const routes: Routes = [
    {
        path: 'app-section',
        component: AppSectionTemplateComponent,
        resolve: {
            sections : AppSectionResolver
        },
        children : [
            {
                path: ':sectionName',
                component: AppSectionRenderComponent,
                resolve: {
                    sections : AppSectionResolver
                },
            },
            {
                path: ':sectionName/:subSectionName',
                component: AppSectionRenderComponent,
                resolve: {
                    sections : AppSectionResolver
                },
            },
            {
                path: ':sectionName/:subSectionName/:paramId',
                component: AppSectionRenderComponent,
                resolve: {
                    sections : AppSectionResolver
                },
            },
        ]
    },
    {
        path: 'tab-section/:sectionName',
        component: TabSectionTemplateComponent,
        children : [
            {
                path: ':sectionName',
                component: AppSectionRenderComponent,
                resolve: {
                    sections : TabSectionResolver
                },
            },
            {
                path: ':sectionName/:subSectionName',
                component: AppSectionRenderComponent,
                resolve: {
                    sections : TabSectionResolver
                },
            },
            {
                path: ':sectionName/:subSectionName/:paramId',
                component: AppSectionRenderComponent,
                resolve: {
                    sections : TabSectionResolver
                },
            },
        ]
    },
];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [AppSectionResolver, TabSectionResolver]
})

export class AppSectionRoutingModule {}
