import { NgModule } from '@angular/core';

import { SampleFormComponent } from './sample-form.component';
import { StaticSectionRoutingModule } from './static-section-routing.module';
import { MaterialModule       } from '../shared/material.module'

@NgModule({
    imports: [
        MaterialModule,
        StaticSectionRoutingModule
    ],
    exports: [],
    declarations: [SampleFormComponent],
    providers: [],
})
export class StaticSectionModule { }
