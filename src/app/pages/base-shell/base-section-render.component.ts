import { ChangeDetectorRef, Directive, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { DynamicFormEvent, DynamicFormService, EventPipelineService } from 'dfg-dynamic-form';
import { AppRuntimeInfoService } from '../../app-communication/service/app-runtime-info.service';
import { FormSaveLoadService } from '../../app-communication/service/form-save-load.service';

import { EnumFormConfigSource, EnumSectionType, Section } from 'dfg-dynamic-form';
import { FormRow } from 'dfg-dynamic-form';
import { ActionConfig } from 'dfg-dynamic-form';

import { ApplicationForm } from 'dfg-dynamic-form';
import { DynamicEventTypes } from 'dfg-dynamic-form';
import { Subscription } from 'rxjs';

@Directive()
export abstract class BaseSectionRenderComponent implements OnDestroy {
    public paramId: string;
    public sectionName: string;
    public subSectionName: string;
    public formConfig: Array<FormRow> = new Array<FormRow>();
    public formData: any;

    protected dynamicFormEventSubscription: Subscription;

    constructor(
        protected route: ActivatedRoute, protected router: Router, protected appRuntimeInfoService: AppRuntimeInfoService,
        protected formSaveLoadService: FormSaveLoadService, protected eventPipelineService: EventPipelineService,
        protected dynamicFormService: DynamicFormService, protected changeDetectorRef: ChangeDetectorRef) {

        setTimeout(() => {
            this.initBaseRender();
        }, 10);
    }

    private initBaseRender() {
        // subscribe to the parameters observable
        this.route.paramMap.subscribe((params) => {
            this.sectionName = params.get('sectionName') || this.appRuntimeInfoService.activeSectionName;
            this.subSectionName = params.get('subSectionName') || this.appRuntimeInfoService.activeSubSectionName;
            this.paramId = params.get('paramId') || this.appRuntimeInfoService.activeParamId;

            // if paramId is at subSectionName level take subSectionName as paramId
            // This happens when subSectionName not exist consider subSectionName as paramId
            if (!this.paramId && this.subSectionName && !this.appRuntimeInfoService.routeSubSection) {
                this.paramId = params.get('subSectionName');
                this.subSectionName = undefined;
            }
            this.loadData();
        });

        this.dynamicFormEventSubscription = this.eventPipelineService.dynamicFormEvent$.subscribe((event: DynamicFormEvent) => {
            this.baseHandleFormEvents(event);
        });
    }

    private loadData() {
        this.formData = {};
        this.formConfig = [];
        this.dynamicFormService.listItemGroupMap = [];
        if (this.sectionName)

            if (this.sectionName) {
                this.loadSectionData();
            }
        if (this.subSectionName) {
            this.loadSubSectionData();
        }
    }

    private loadSectionData() {

        if (this.appRuntimeInfoService.routeSection
            && this.appRuntimeInfoService.routeSection.sectionType === EnumSectionType.FORM_SECTION) {
            this.loadFormConfig(this.appRuntimeInfoService.routeSection);
        }
    }

    private loadSubSectionData() {

        if (this.appRuntimeInfoService.routeSubSection &&
            this.appRuntimeInfoService.routeSubSection.sectionType === EnumSectionType.FORM_SECTION) {
            this.loadFormConfig(this.appRuntimeInfoService.routeSubSection);
        }
    }

    private loadFormConfig(section: Section) {
        if (section) {
            if (section.formConfigSource === EnumFormConfigSource.LOCAL) {
                this.formConfig = section.formConfigData;
            } else if (section.formConfigSource === EnumFormConfigSource.SERVER) {

                // Read new form config from DB every time
                this.appRuntimeInfoService.loadFormConfig(section.formConfigPath).subscribe((response: ApplicationForm) => {

                    section.formConfigData = response.formConfig ? JSON.parse(response.formConfig) : response;
                    if (typeof section.formConfigData === 'string') {
                        section.formConfigData = JSON.parse(section.formConfigData);
                    }
                    this.formConfig = section.formConfigData;

                    this.loadFormData();
                    this.afterFormConfigLoaded();
                });

            }
        }
    }

    protected abstract afterFormConfigLoaded(): void;

    private loadFormData() {
        if (this.formSaveLoadService.getLoadApiUrl()) {
            this.formSaveLoadService.loadFormData(this.paramId).subscribe((response: any) => {
                if (this.appRuntimeInfoService.activeRouteSection.loadConfig.actionResultBindModelKey && this.paramId == null) {
                    this.copyDataInArray(response,
                        this.formData[this.appRuntimeInfoService.activeRouteSection.loadConfig.actionResultBindModelKey]);
                } else {
                    this.formData = response;
                    this.formData.paramId = this.formData.paramId ? this.formData.paramId : this.paramId;
                }
            });
        }
        if (this.paramId) {
            this.formData.paramId = this.paramId;
        }

    }


    protected abstract handleFormEvents(event: DynamicFormEvent): boolean;

    private baseHandleFormEvents(event: DynamicFormEvent) {

        console.log(event);

        if (this.handleFormEvents(event)) {

            if (event.eventName && event.eventActionConfig) {
                this.formSaveLoadService.handelFormEventActionConfig(event, false)
                    .subscribe((response: any) => {
                        if (event.eventActionConfig.actionResultBindModelKey) {
                            this.copyDataInArray(response, this.formData[event.eventActionConfig.actionResultBindModelKey]);
                            const dataRefreshEvent = new DynamicFormEvent();
                            dataRefreshEvent.eventType = DynamicEventTypes.DATA_REFRESH;
                            this.eventPipelineService.raseDataTableEvent(dataRefreshEvent);
                        }
                        if (event.eventActionConfig.actionRedirect) {
                            this.router.navigateByUrl(event.eventActionConfig.actionRedirect);
                        }
                    });
            }
        }
    }

    public onSave() {
        console.log(this.formData);

        this.formSaveLoadService.saveCurrentRouteFormData(this.formData);
    }

    public onCancel(cancelConfig: ActionConfig) {
        console.log(cancelConfig);

        if (cancelConfig.actionRedirect) {

            const redirectUrl = cancelConfig.actionRedirect.replace('#', '') +
                this.formData[cancelConfig.actionRedirectParameterKey] ? '/' + this.formData[cancelConfig.actionRedirectParameterKey] : '';

            this.router.navigateByUrl(redirectUrl);
        }
    }

    protected copyDataInArray(source: any[], destination: any[]) {

        if (!destination) {
            destination = [];
        } else {
            const arrayLen = destination.length;
            for (let index = 0; index < arrayLen; index++) {
                destination.pop();
            }
        }

        source.forEach((element) => {
            destination.push(element);
        });
    }

    public ngOnDestroy() {
        // prevent memory leak and multiple event subscription
        if (this.dynamicFormEventSubscription) {
            this.dynamicFormEventSubscription.unsubscribe();
        }
    }

}
