import { NgModule } from '@angular/core';

import { FormDesignerModule } from './form-designer/form-designer.module';
import { FormSectionModule  } from './form-section/form-section.module';

@NgModule({
  imports: [
    FormDesignerModule,
    FormSectionModule
  ],
  exports: [],
  declarations: [],
  providers: [],
})
export class FrameWorkUtilModule { }
