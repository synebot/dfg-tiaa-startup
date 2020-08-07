import { BrowserModule                      } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER          } from '@angular/core';
import { RouterModule                       } from '@angular/router';
import { FormsModule                        } from '@angular/forms';
import { HttpClientModule                   } from '@angular/common/http';
import { BrowserAnimationsModule            } from '@angular/platform-browser/animations';

import { AppComponent         } from './app.component';
import { AppSectionModule     } from './app-section/app-section.module';
import { AppRoutingModule     } from './app-routing.module';
import { AppConfigModule      } from './app-communication/app-communication.module';
import { SharedModule         } from './shared/shared.module';
import { StaticSectionModule  } from './static-section/static-section.module';
import { MaterialModule       } from './shared/material.module';
import { FrameWorkUtilModule  } from './framework-util/framework-util.module';
import { DynamicFormModule    } from 'dfg-dynamic-form';

import { AppInitService           } from './app-communication/service/app-init.service';
import { httpInterceptorProviders } from './app-communication/http-interceptors';
import { DragulaModule } from 'ng2-dragula';

export function initApp(appInitService: AppInitService) {
  return () => appInitService.initializeApp();
}

// export function getApplicationSettings(appInitService: AppInitService) {
//   return () => appInitService.getApplicationSettings();
// }

/**
 * Developer : Onkar Kulkarni
 */
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    RouterModule,
    BrowserAnimationsModule,
    HttpClientModule,
    DragulaModule.forRoot(),
    AppSectionModule,
    AppConfigModule,
    AppRoutingModule,
    StaticSectionModule,
    FrameWorkUtilModule,
    DynamicFormModule,
    SharedModule,
    MaterialModule,

  ],
  exports: [
    DynamicFormModule,
    SharedModule,
    MaterialModule,
  ],
  providers: [
    httpInterceptorProviders,
    AppInitService,
    { provide: APP_INITIALIZER, useFactory: initApp, deps: [AppInitService], multi: true },
    // { provide: APP_INITIALIZER, useFactory: getApplicationSettings, deps: [AppInitService], multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
