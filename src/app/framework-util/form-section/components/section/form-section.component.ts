import { Component, OnInit                } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { AppRuntimeInfoService            } from '../../../../app-communication/service/app-runtime-info.service';
import { FormSaveLoadService              } from '../../../../app-communication/service/form-save-load.service';
import { FormSectionService               } from '../../service/form-section.service';

import { FormSectionConfig  } from 'dfg-dynamic-form';
import { AppFormBase        } from 'dfg-dynamic-form';
import { ActionConfig       } from 'dfg-dynamic-form';
import { Section            } from 'dfg-dynamic-form';

@Component({
  selector: 'app-form-section',
  templateUrl: 'form-section.component.html'
})

export class FormSectionComponent implements OnInit, AppFormBase {

  formSection: Section;
  formConfig: any[];

  constructor(private formSaveLoadService: FormSaveLoadService, private appRuntimeInfoService: AppRuntimeInfoService,
              private formSectionService: FormSectionService,
              private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.appFormComponentInit();
  }

  appFormComponentInit() {
    this.appRuntimeInfoService.setSection('manageAppSection');
    this.initializeRoute();
    this.initFormConfig();
  }

  initializeRoute() {
    this.route.paramMap
      .subscribe ((params: ParamMap) => {
        if (params.get('id')) {
          this.loadData(+params.get('id'));
          } else {
            this.addNewForm();
          }
    });
  }

  initFormConfig() {
    this.formConfig = new FormSectionConfig().getStringConfig();
  }
  loadData(id: number) {
    // this.formSaveLoadService.loadFormData(id).subscribe((response: Section) => {
    //   console.log(response);
    //   this.formSection = response;
    // });

    this.formSectionService.getSectionConfig(id).subscribe((response: Section) => {
      console.log(2, response);
      this.formSection = response;
    });
  }

  addNewForm() {
    this.formSection = new Section({});
  }

  onSave(saveConfig: ActionConfig) {
    this.formSectionService.saveSectionConfig(this.formSection);
  }

  onCancel(cancelConfig: ActionConfig) {
    console.log(cancelConfig);

    if (cancelConfig.actionRedirect) {

        let redirectUrl = cancelConfig.actionRedirect.replace('#', '');

        this.router.navigateByUrl(redirectUrl);
    }
  }

}
