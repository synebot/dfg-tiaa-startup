import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DynamicFormModule } from 'dfg-dynamic-form';
import { ChangeFromPageModule } from './demo-pages/change-from/change-from.module';
import { DynamicSectionsModule } from './dynamic-section/dynamic-section.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ChangeFromPageModule,
    DynamicFormModule,
    DynamicSectionsModule,
  ],
})
export class PagesModule { }
