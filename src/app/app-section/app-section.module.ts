import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AppSectionRoutingModule } from './app-section-routing.module';

import { AppSectionTemplateComponent } from './components/section-template.component';
import { AppSectionRenderComponent } from './components/section-render.component';
import { TabSectionTemplateComponent } from './components/tab-section-template.component';

import { SharedModule } from '../shared/shared.module';

// import { FormDesignerModule             } from '../form-designer/form-designer.module';

import { MaterialModule } from '../shared/material.module';
// import { DynamicFormModule              } from '../dynamic-form/dynamic-form.module';
import { DynamicFormModule } from 'dfg-dynamic-form';


@NgModule({
    declarations: [
        AppSectionTemplateComponent,
        AppSectionRenderComponent,
        TabSectionTemplateComponent
    ],
    imports: [
        CommonModule,
        AppSectionRoutingModule,
        ReactiveFormsModule,
        DynamicFormModule,
        // FormDesignerModule,
        MaterialModule,
        SharedModule
    ],
    exports: [


    ],
    providers: [

    ]
})
export class AppSectionModule { }
