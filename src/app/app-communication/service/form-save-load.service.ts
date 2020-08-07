import { Injectable, OnInit     } from '@angular/core';
import { HttpClient, HttpParams             } from '@angular/common/http';
import { Router                 } from '@angular/router';

import { AppRuntimeInfoService  } from './app-runtime-info.service';
import { FormRow, FormDesigner  } from 'dfg-dynamic-form';
import { Observable             } from 'rxjs';
import { NotificationService, NOTIFICATION_TYPE } from '../../shared/form-helpers/notification/notification.service';
import { DynamicFormEvent     } from 'dfg-dynamic-form';
import { ACTION_TYPE          } from 'dfg-dynamic-form';
import { tap } from 'rxjs/operators';

/**
 * Developer : Onkar Kulkarni
 */

@Injectable()
export class FormSaveLoadService {

  /**
   * This is form load key. This value will be used to Load and Save form.
   */
  private formLoadKeyValue: any;

  constructor(private httpClient: HttpClient, private router: Router, private appRuntimeInfoService: AppRuntimeInfoService,
    private notificationService: NotificationService) { }


  public getLoadApiUrl(): string {
    if (this.appRuntimeInfoService.isSubSectionLoaded !== void 0 && this.appRuntimeInfoService.isSubSectionLoaded) {
      return this.appRuntimeInfoService.routeSubSection.loadConfig.actionApiUrl;
    } else {
      return this.appRuntimeInfoService.routeSection.loadConfig.actionApiUrl;
    }
  }

  public getSaveApiUrl(): string {
    if (this.appRuntimeInfoService.isSubSectionLoaded !== void 0  &&  this.appRuntimeInfoService.isSubSectionLoaded) {
      return this.appRuntimeInfoService.routeSubSection.saveConfig.actionApiUrl;
    } else {
      return this.appRuntimeInfoService.routeSection.saveConfig.actionApiUrl;
    }
  }

  private getRouteUrl(): string {
    if (this.appRuntimeInfoService.isSubSectionLoaded !== void 0  &&  this.appRuntimeInfoService.isSubSectionLoaded) {
      return this.appRuntimeInfoService.routeSubSection.sectionLink;
    } else {
      return this.appRuntimeInfoService.routeSection.sectionLink;
    }
  }

  loadTableData() {
    let loadApiUrl = this.getLoadApiUrl();

    if (loadApiUrl) {
      return this.httpClient.get(loadApiUrl);
    }
  }

  loadFormData(id: any) {
    let loadApiUrl = this.getLoadApiUrl();

    if (loadApiUrl) {
      if (id) {
        this.formLoadKeyValue = id;
        return this.httpClient.get(loadApiUrl + '/' + this.formLoadKeyValue);
      } else {
        return this.httpClient.get(loadApiUrl);
      }
    }
  }

  saveCurrentRouteFormData(formData: any, fromDataKeyValue?: any, redirectUrl?: string) {
    let saveApiURL = this.getSaveApiUrl();
    let routeUrl = this.getRouteUrl();
    let isFirstTimeSave = false;

    this.notificationService.sendNotification('Saving...', NOTIFICATION_TYPE.INFO);

    fromDataKeyValue = fromDataKeyValue ? fromDataKeyValue : this.formLoadKeyValue;

    if (saveApiURL) {

      if (formData) {
        let saveObservable: Observable<any>;
        // create New
        if (formData['id'] === void 0 || formData['id'] === null)  {

          // TODO: remove this with actual key from db
          formData['id'] = null;
          isFirstTimeSave = true;
          saveObservable = this.httpClient.post(saveApiURL, formData);

        } else {

          // Update record
          saveObservable = this.httpClient.put(saveApiURL + '/' +  fromDataKeyValue, formData);

        }

        return saveObservable.subscribe((response: FormDesigner) => {
          console.log(response);

          if (isFirstTimeSave && !this.appRuntimeInfoService.activeRouteSection.saveConfig.actionRedirect) {
            // Change route in address bar to reflect new key
            this.router.navigate([this.appRuntimeInfoService.currentRouteUrl, {id: response.id}]);

          } else if (this.appRuntimeInfoService.activeRouteSection.saveConfig.actionRedirect) {

            if (!redirectUrl) {
              redirectUrl = this.appRuntimeInfoService.activeRouteSection.saveConfig.actionRedirect.replace('#', '') +
                              formData[this.appRuntimeInfoService.activeRouteSection.saveConfig.actionRedirectParameterKey] ?
                              '/' + formData[this.appRuntimeInfoService.activeRouteSection.saveConfig.actionRedirectParameterKey] : '';
            }
            this.router.navigateByUrl(redirectUrl);

          }
          this.notificationService.sendNotification('Save Complete.', NOTIFICATION_TYPE.SUCCESS);
        });
      }
    }
  }

  handelFormEventActionConfig(event: DynamicFormEvent, sendNullValue =  true): Observable<any> {

    // console.log('AppSectionRenderComponent.handelFormEventActionConfig', event);

    if (event.eventActionConfig) {

      if (event.eventActionConfig.actionType === ACTION_TYPE.SEARCH_ACTION) {


          let options =  { params: event.getHttpParams(sendNullValue) };
          return this.httpClient.get(event.eventActionConfig.actionApiUrl, options);
          // .pipe(
          //   tap( (response: any)  => {
          //       console.log(response);
          //     }
          //   )
          // );
          // .subscribe((response: any) => {
          //   event.eventFormData[event.eventActionConfig.actionResultBindModelKey] = response;
          //   console.log(response);
          // });
      }
    }

  }

  // saveCurrentRouteFormDataObservable(formData: any, fromDataKeyValue?: any) {
  //   let saveApiURL = this.getSaveApiUrl();
  //   let routeUrl = this.getRouteUrl();

  //   fromDataKeyValue = fromDataKeyValue ? fromDataKeyValue : this.formLoadKeyValue;

  //   if (formData) {
  //     // create New
  //     if (formData['id'] === void 0 || formData['id'] === null)  {
  //       return this.httpClient.post(saveApiURL, formData);

  //     } else {
  //       // Update record
  //       return this.httpClient.put(saveApiURL + '/' +  fromDataKeyValue, formData);
  //     }
  //   }
  // }
}
