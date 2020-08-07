import { NgModule               } from '@angular/core';
import { CommonModule           } from '@angular/common';

import { AppConfigService       } from './service/app-config.service';
import { AppRuntimeInfoService  } from './service/app-runtime-info.service';
import { UIMessageService       } from './service/ui-message.service';
import { FormSaveLoadService    } from './service/form-save-load.service';

@NgModule({
    declarations: [],
    imports: [ CommonModule ],
    exports: [],
    providers: [
        AppConfigService,
        AppRuntimeInfoService,
        UIMessageService,
        FormSaveLoadService
    ],
})
export class AppConfigModule {}

