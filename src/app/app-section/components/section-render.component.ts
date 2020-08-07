import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


import { AppRuntimeInfoService } from '../../app-communication/service/app-runtime-info.service';
import { FormSaveLoadService } from '../../app-communication/service/form-save-load.service';
import { EventPipelineService, DynamicFormEvent, DynamicFormService } from 'dfg-dynamic-form';

import { Section, EnumFormConfigSource, EnumSectionType } from 'dfg-dynamic-form';
import { FormRow } from 'dfg-dynamic-form';
import { ActionConfig } from 'dfg-dynamic-form';

import { Subscription } from 'rxjs';
import { ApplicationForm } from 'dfg-dynamic-form';
import { DynamicEventTypes } from 'dfg-dynamic-form';


@Component({
    selector: 'app-section-render',
    templateUrl: './section-render.component.html'
})
export class AppSectionRenderComponent implements OnInit, OnDestroy {
    paramId: string;
    sectionName: string;
    subSectionName: string;
    formConfig: Array<FormRow> = new Array<FormRow>();
    formData: any;

    private dynamicFormEventSubscription: Subscription;

    constructor(private route: ActivatedRoute, private router: Router, private appRuntimeInfoService: AppRuntimeInfoService,
        private formSaveLoadService: FormSaveLoadService, private eventPipelineService: EventPipelineService,
        private dynamicFormService: DynamicFormService,
        protected changeDetectorRef: ChangeDetectorRef) { }

    ngOnInit() {
        // subscribe to the parameters observable
        this.route.paramMap.subscribe(params => {
            this.sectionName = params.get('sectionName');
            this.subSectionName = params.get('subSectionName');
            this.paramId = params.get('paramId');

            // if paramId is at subSectionName level take subSectionName as paramId
            // This happens when subSectionName not exist consider subSectionName as paramId
            if (!this.paramId && this.subSectionName && !this.appRuntimeInfoService.routeSubSection) {
                this.paramId = params.get('subSectionName');
                this.subSectionName = undefined;
            }
            this.loadData();
        });


        this.dynamicFormEventSubscription = this.eventPipelineService.dynamicFormEvent$.subscribe((event: DynamicFormEvent) => {
            this.handleFormEvents(event);
        });
    }

    loadData() {
        this.formData = {};
        this.formConfig = [];
        this.dynamicFormService.listItemGroupMap = [];

        if (this.sectionName) {
            this.loadSectionData();
        }
        if (this.subSectionName) {
            this.loadSubSectionData();
        }
    }

    loadSectionData() {

        if (this.appRuntimeInfoService.routeSection
            && this.appRuntimeInfoService.routeSection.sectionType === EnumSectionType.FORM_SECTION) {
            this.loadFormConfig(this.appRuntimeInfoService.routeSection);
        }
    }

    loadSubSectionData() {

        if (this.appRuntimeInfoService.routeSubSection &&
            this.appRuntimeInfoService.routeSubSection.sectionType === EnumSectionType.FORM_SECTION) {
            this.loadFormConfig(this.appRuntimeInfoService.routeSubSection);
        }
    }

    loadFormConfig(section: Section) {
        if (section) {
            if (section.formConfigSource === EnumFormConfigSource.LOCAL) {
                this.formConfig = section.formConfigData;
            } else if (section.formConfigSource === EnumFormConfigSource.SERVER) {

                // Read new form config from DB eveytime
                this.appRuntimeInfoService.loadFormConfig(section.formConfigPath).subscribe((response: ApplicationForm) => {

                    section.formConfigData = response.formConfig ? JSON.parse(response.formConfig) : response;
                    if (typeof section.formConfigData === 'string') {
                        section.formConfigData = JSON.parse(section.formConfigData);
                    }
                    this.formConfig = section.formConfigData;

                    this.loadFormData();
                });

            }
        }
    }

    loadFormData() {
        if (this.formSaveLoadService.getLoadApiUrl()) {
            this.formSaveLoadService.loadFormData(this.paramId).subscribe((response: any) => {
                if (this.appRuntimeInfoService.activeRouteSection.loadConfig.actionResultBindModelKey && this.paramId == null) {
                    this.copyDataInArray(response, this.formData[this.appRuntimeInfoService.activeRouteSection.loadConfig.actionResultBindModelKey]);
                } else {
                    this.formData = response;
                    this.formData['paramId'] = this.formData['paramId'] ? this.formData['paramId'] : this.paramId;
                }
            });
        }
        if (this.paramId) {
            this.formData['paramId'] = this.paramId;
        }

    }

    onsave(saveConfig: ActionConfig) {
        console.log(this.formData);

        this.formSaveLoadService.saveCurrentRouteFormData(this.formData);
    }

    oncancel(cancelConfig: ActionConfig) {
        console.log(cancelConfig);

        if (cancelConfig.actionRedirect) {

            let redirectUrl = cancelConfig.actionRedirect.replace('#', '') +
                this.formData[cancelConfig.actionRedirectParameterKey] ? '/' + this.formData[cancelConfig.actionRedirectParameterKey] : '';

            this.router.navigateByUrl(redirectUrl);
        }
    }

    private handleFormEvents(event: DynamicFormEvent) {

        console.log(event, this.dynamicFormService);

        if (event.eventName && event.eventActionConfig) {
            this.formSaveLoadService.handelFormEventActionConfig(event, false)
                .subscribe((response: any) => {
                    if (event.eventActionConfig.actionResultBindModelKey) {
                        this.copyDataInArray(response, this.formData[event.eventActionConfig.actionResultBindModelKey]);
                        let dataRefreshEvent = new DynamicFormEvent();
                        dataRefreshEvent.eventType = DynamicEventTypes.DATA_REFRESH;
                        this.eventPipelineService.raseDataTableEvent(dataRefreshEvent);
                    }
                    if (event.eventActionConfig.actionRedirect) {
                        this.router.navigateByUrl(event.eventActionConfig.actionRedirect);
                    }
                });
        }
    }

    copyDataInArray(source: any[], destination: any[]) {

        if (!destination) {
            destination = [];
        } else {
            let arrayLen = destination.length;
            for (let index = 0; index < arrayLen; index++) {
                destination.pop();
            }
        }

        source.forEach(element => {
            destination.push(element);
        });
    }



    ngOnDestroy() {
        // prevent memory leak and multiple event susbriction
        if (this.dynamicFormEventSubscription) {
            this.dynamicFormEventSubscription.unsubscribe();
        }
    }

}
