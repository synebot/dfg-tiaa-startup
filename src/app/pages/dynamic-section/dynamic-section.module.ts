import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DynamicFormModule } from 'dfg-dynamic-form';
import { AppSectionModule } from './app-section/app-section.module';
import { SectionRendererComponent } from './section-renderer/section-renderer.component';
import { TabSectionModule } from './tab-section/tab-section.module';

@NgModule({
  declarations: [
    SectionRendererComponent,
  ],
  imports: [
    CommonModule,
    DynamicFormModule,
    AppSectionModule,
    TabSectionModule,
  ],
})
export class DynamicSectionsModule { }
