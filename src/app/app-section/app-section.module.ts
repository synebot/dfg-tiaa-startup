import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppSectionRoutingModule } from './app-section-routing.module';

import { AppSectionRenderComponent } from './components/section-render.component';
import { AppSectionTemplateComponent } from './components/section-template.component';
import { TabSectionTemplateComponent } from './components/tab-section-template.component';

import { SharedModule } from '../shared/shared.module';

// import { FormDesignerModule             } from '../form-designer/form-designer.module';

// import { DynamicFormModule              } from '../dynamic-form/dynamic-form.module';
import { DynamicFormModule } from 'dfg-dynamic-form';
import { MaterialModule } from '../shared/material.module';

@NgModule({
    declarations: [
        AppSectionTemplateComponent,
        AppSectionRenderComponent,
        TabSectionTemplateComponent,
    ],
    imports: [
        CommonModule,
        AppSectionRoutingModule,
        ReactiveFormsModule,
        DynamicFormModule,
        // FormDesignerModule,
        MaterialModule,
        SharedModule,
    ],
    exports: [

    ],
    providers: [

    ],
})
export class AppSectionModule { }
