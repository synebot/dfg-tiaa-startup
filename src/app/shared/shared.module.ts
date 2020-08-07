import { NgModule, ANALYZE_FOR_ENTRY_COMPONENTS                   } from '@angular/core';
import { CommonModule               } from '@angular/common';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material';

import { MaterialModule         } from './material.module';
import { DynamicFormModule      } from 'dfg-dynamic-form';
import { FooterComponent        } from './layout/footer/footer.component';
import { LeftNavComponent       } from './layout/left-nav/left-nav.component';
import { HeaderComponent        } from './layout/header/header.component';
import { ToolBarComponent       } from './layout/header/toolbar.component';
import { ArticalHeaderComponent } from './artical-header/artical-header.component';
import { AppAsideComponent      } from './aside/aside.component';

import { DialogComponent        } from './dialog/dialog.component';
import { AsideService           } from './aside/aside.service';
import { DialogService          } from './dialog/dialog.service';
import { FilterPipe             } from './pipe/filter.pipe';
import { FormActionBarComponent } from './form-helpers/form-action-bar/form-action-bar.component';
import { NotificationComponent  } from './form-helpers/notification/notification.component';

@NgModule({
  imports: [
    CommonModule,
    DynamicFormModule,
    MaterialModule
  ],
  declarations: [
    HeaderComponent,
    ToolBarComponent,
    LeftNavComponent,
    FooterComponent,
    DialogComponent,
    ArticalHeaderComponent,
    AppAsideComponent,
    FilterPipe,
    FormActionBarComponent,
    NotificationComponent
  ],
  exports: [
    HeaderComponent,
    ToolBarComponent,
    LeftNavComponent,
    FooterComponent,
    DialogComponent,
    AppAsideComponent,
    ArticalHeaderComponent,
    FilterPipe,
    FormActionBarComponent,
    NotificationComponent
  ],
  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true}},
    AsideService,
    DialogService
  ],
  entryComponents: [
    DialogComponent
  ]
})
export class SharedModule { }
