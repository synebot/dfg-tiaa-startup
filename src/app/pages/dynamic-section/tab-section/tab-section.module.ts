import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TabSectionPageRoutingModule } from './tab-section-routing.module';
import { TabSectionComponent } from './tab-section.component';

@NgModule({
  declarations: [TabSectionComponent],
  imports: [
    CommonModule,
    TabSectionPageRoutingModule,
  ],
})
export class TabSectionModule { }
