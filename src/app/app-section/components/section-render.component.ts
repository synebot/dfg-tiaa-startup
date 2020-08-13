import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { DYNAMIC_EVENT_TYPES, DynamicFormEvent, DynamicFormService, EventPipelineService } from 'dfg-dynamic-form';
import { AppRuntimeInfoService } from '../../app-communication/service/app-runtime-info.service';
import { FormSaveLoadService } from '../../app-communication/service/form-save-load.service';

import { EnumFormConfigSource, EnumSectionType, Section } from 'dfg-dynamic-form';
import { FormRow } from 'dfg-dynamic-form';
import { ActionConfig } from 'dfg-dynamic-form';

import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ApplicationForm } from 'dfg-dynamic-form';
import { DynamicEventTypes } from 'dfg-dynamic-form';
import { forkJoin, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';
import { DialogService } from 'src/app/shared/dialog/dialog.service';

@Component({
    selector: 'app-section-render',
    templateUrl: './section-render.component.html',
})
export class AppSectionRenderComponent implements OnInit, OnDestroy {
    public paramId: string;
    public sectionName: string;
    public subSectionName: string;
    public formConfig: Array<FormRow> = new Array<FormRow>();
    public formData: any;

    private dynamicFormEventSubscription: Subscription;

    constructor(
        private route: ActivatedRoute, private router: Router, public appRuntimeInfoService: AppRuntimeInfoService,
        private formSaveLoadService: FormSaveLoadService, private eventPipelineService: EventPipelineService,
        private dynamicFormService: DynamicFormService, protected changeDetectorRef: ChangeDetectorRef,
        private dialogService: DialogService, private dialog: MatDialog) { }

    public ngOnInit() {
        // subscribe to the parameters observable
        this.route.paramMap.subscribe((params) => {
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

    public loadData() {
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

    public loadSectionData() {

        if (this.appRuntimeInfoService.routeSection
            && this.appRuntimeInfoService.routeSection.sectionType === EnumSectionType.FORM_SECTION) {
            this.loadFormConfig(this.appRuntimeInfoService.routeSection);
        }
    }

    public loadSubSectionData() {

        if (this.appRuntimeInfoService.routeSubSection &&
            this.appRuntimeInfoService.routeSubSection.sectionType === EnumSectionType.FORM_SECTION) {
            this.loadFormConfig(this.appRuntimeInfoService.routeSubSection);
        }
    }

    public loadFormConfig(section: Section) {
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

    public loadFormData() {
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

    public onsave(saveConfig: ActionConfig) {
        console.log(this.formData);

        this.formSaveLoadService.saveCurrentRouteFormData(this.formData);
    }

    public oncancel(cancelConfig: ActionConfig) {
        console.log(cancelConfig);

        if (cancelConfig.actionRedirect) {

            const redirectUrl = cancelConfig.actionRedirect.replace('#', '') +
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
                        const dataRefreshEvent = new DynamicFormEvent();
                        dataRefreshEvent.eventType = DynamicEventTypes.DATA_REFRESH;
                        this.eventPipelineService.raseDataTableEvent(dataRefreshEvent);
                    }
                    if (event.eventActionConfig.actionRedirect) {
                        this.router.navigateByUrl(event.eventActionConfig.actionRedirect);
                    }
                });
        } else if (event.eventModelFieldKey === 'investmentSelected' && event.eventType === DYNAMIC_EVENT_TYPES.CHANGE && event.eventData) {
            this.openContractDialog(event);
        }
    }

    private openContractDialog(event: DynamicFormEvent) {
        // TODO: design form for contract page
        const contractListConfigApi = 'http://localhost:3000/formMaster/28';
        // TODO: design mock data for contract page
        const contractListDataApi = 'http://localhost:3000/contractOptions';

        const fetchFormConfig$ = this.appRuntimeInfoService.loadFormConfig(contractListConfigApi).pipe(
            map((applicationForm: ApplicationForm) => {
                if (applicationForm && applicationForm.formConfig) {
                    this.dialogService.dialogFormConfig = JSON.parse(applicationForm.formConfig);
                }
            }));

        const fetchFormData$ = this.appRuntimeInfoService.loadFormConfig(contractListDataApi).pipe(
            map((contractListDataResponse: any[]) => {
                if (contractListDataResponse) {
                    this.dialogService.dialogFormData = {};
                    this.dialogService.dialogFormData.accountList = [];
                    this.copyDataInArray(contractListDataResponse, this.dialogService.dialogFormData.contractList);
                    // this.dialogService.dialogFormData.accountList = contractListDataResponse;
                }
            }));

        forkJoin([fetchFormConfig$, fetchFormData$]).subscribe((response) => {
            if (response) {
                this.openDialog();
            }
        });
    }

    public openDialog(): MatDialogRef<any> {
        let dialogRef: MatDialogRef<any>;
        dialogRef = this.dialog.open(DialogComponent);
        return dialogRef;
    }

    public copyDataInArray(source: any[], destination: any[]) {

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
