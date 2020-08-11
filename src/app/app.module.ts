import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { DynamicFormModule } from 'dfg-dynamic-form';
import { DragulaModule } from 'ng2-dragula';
import { AppConfigModule } from './app-communication/app-communication.module';
import { httpInterceptorProviders } from './app-communication/http-interceptors';
import { AppInitService } from './app-communication/service/app-init.service';
import { AppRoutingModule } from './app-routing.module';
import { AppSectionModule } from './app-section/app-section.module';
import { AppComponent } from './app.component';
import { FrameWorkUtilModule } from './framework-util/framework-util.module';
import { HomePageComponent } from './home-page/home-page.component';
import { HomeComponent } from './home/home.component';
import { MaterialModule } from './shared/material.module';
import { SharedModule } from './shared/shared.module';
import { StaticSectionModule } from './static-section/static-section.module';

export function initApp(appInitService: AppInitService): () => void {
  return () => appInitService.initializeApp();
}

// export function getApplicationSettings(appInitService: AppInitService) {
//   return () => appInitService.getApplicationSettings();
// }

/**
 * Developer : Onkar Kulkarni
 */
@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    HomePageComponent,
    HomeComponent,
  ],
  exports: [
    DynamicFormModule,
    SharedModule,
    MaterialModule,
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
  providers: [
    httpInterceptorProviders,
    AppInitService,
    { provide: APP_INITIALIZER, useFactory: initApp, deps: [AppInitService], multi: true },
    // { provide: APP_INITIALIZER, useFactory: getApplicationSettings, deps: [AppInitService], multi: true }
  ],
})
export class AppModule { }
