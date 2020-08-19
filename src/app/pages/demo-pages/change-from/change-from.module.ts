import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DynamicFormModule } from 'dfg-dynamic-form';
import { ChangeFromPageRoutingModule } from './change-from-routing.module';
import { ChangeFromComponent } from './change-from.component';


@NgModule({
  declarations: [ChangeFromComponent],
  imports: [
    CommonModule,
    DynamicFormModule,
    ChangeFromPageRoutingModule,
  ],
})
export class ChangeFromPageModule { }
