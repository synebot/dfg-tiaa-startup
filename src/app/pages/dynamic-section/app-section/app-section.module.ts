import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppSectionPageRoutingModule } from './app-section-routing.module';
import { AppSectionComponent } from './app-section.component';

@NgModule({
  declarations: [AppSectionComponent],
  imports: [
    CommonModule,
    AppSectionPageRoutingModule,
  ],
})
export class AppSectionModule { }
