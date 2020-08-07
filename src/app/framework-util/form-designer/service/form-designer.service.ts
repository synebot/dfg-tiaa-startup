import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router     } from '@angular/router';

import { AppRuntimeInfoService                                } from '../../../app-communication/service/app-runtime-info.service';

import { FormRow, FormDesigner, FrameworkBootstrapService     } from 'dfg-dynamic-form';
import { ApplicationForm                                      } from 'dfg-dynamic-form';

/**
 * Developer : Onkar Kulkarni
 */

@Injectable()
export class FormDesignerService {

  // formConfigURL = 'http://localhost:3000/FromConfig';

  constructor(private httpClient: HttpClient, private router: Router,
      private appRuntimeInfoService: AppRuntimeInfoService, private frameworkBootstrapService: FrameworkBootstrapService) { }


  getLoadApiUrl(): string {
    if (this.appRuntimeInfoService.isSubSectionLoaded !== void 0 && this.appRuntimeInfoService.isSubSectionLoaded) {
      return this.appRuntimeInfoService.routeSubSection.loadConfig.actionApiUrl;
    } else {
      return this.appRuntimeInfoService.routeSection.loadConfig.actionApiUrl;
    }
  }

  getSaveApiUrl(): string {
    if (this.appRuntimeInfoService.isSubSectionLoaded !== void 0  &&  this.appRuntimeInfoService.isSubSectionLoaded) {
      return this.appRuntimeInfoService.routeSubSection.saveConfig.actionApiUrl;
    } else {
      return this.appRuntimeInfoService.routeSection.saveConfig.actionApiUrl;
    }
  }

  getFormConfig(id?: number) {
    // let loadApiUrl = this.getLoadApiUrl();
    let loadApiUrl = this.frameworkBootstrapService.frameWorkConfig.formApi;

    if (id) {
      return this.httpClient.get(loadApiUrl + '/' + id);
    } else {
      return this.httpClient.get(loadApiUrl);
    }
  }

  saveFormConfig(form: FormDesigner) {
    // let saveApiURL = this.getSaveApiUrl();

    let saveApiURL = this.frameworkBootstrapService.frameWorkConfig.formApi;

    let formSaveObject = new ApplicationForm();
    formSaveObject.formId = form.id;
    formSaveObject.id = form.id;
    formSaveObject.formName = form.formName;
    formSaveObject.formDescription = form.formDescription;
    formSaveObject.formConfig = JSON.stringify(form.formConfig);
    formSaveObject.isDeleted = form.isDeleted;

    if (formSaveObject) {
      // create New
      if (formSaveObject.id === void 0 || formSaveObject.id === null)  {
          return this.httpClient.post(saveApiURL, formSaveObject).subscribe((response: FormDesigner) => {
            this.router.navigate(['/form-designer/formDesigner', {id: response.id}]);
            console.log(response);
          });
      } else {
        // update
        return this.httpClient.put(saveApiURL + '/' +  form.id, formSaveObject).subscribe((response: any) => {
          console.log(response);
        });
      }
    }
  }
}
