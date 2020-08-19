import { Location } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import * as dfgDynamicForm from 'dfg-dynamic-form';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { DialogService } from 'src/app/shared/dialog/dialog.service';
import { AppRuntimeInfoService } from '../../../app-communication/service/app-runtime-info.service';
import { FormSaveLoadService } from '../../../app-communication/service/form-save-load.service';
import { BaseSectionRenderComponent } from '../../base-shell/base-section-render.component';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';

@Component({
  selector: 'app-change-from',
  templateUrl: './change-from.component.html',
  styleUrls: ['./change-from.component.css'],
})
export class ChangeFromComponent extends BaseSectionRenderComponent implements OnInit {

  constructor(
    protected route: ActivatedRoute, protected router: Router, protected appRuntimeInfoService: AppRuntimeInfoService,
    protected formSaveLoadService: FormSaveLoadService, protected eventPipelineService: dfgDynamicForm.EventPipelineService,
    protected dynamicFormService: dfgDynamicForm.DynamicFormService, protected changeDetectorRef: ChangeDetectorRef,
    private dialogService: DialogService, private dialog: MatDialog, private location: Location) {
    super(route, router, appRuntimeInfoService, formSaveLoadService, eventPipelineService, dynamicFormService, changeDetectorRef);
  }

  public ngOnInit(): void {
    console.log('Change From');
  }

  protected afterFormConfigLoaded(): void {

  }

  protected handleFormEvents(event: dfgDynamicForm.DynamicFormEvent): boolean {
    const navButtonsList = ['changeFromContinueBtn', 'changeFromGoBackBtn', 'changeToContinueBtn', 'changeToGoBackBtn'];

    if (event.eventModelFieldKey === 'investmentSelected' && event.eventType === dfgDynamicForm.DYNAMIC_EVENT_TYPES.CHANGE && event.eventData) {
      this.openContractDialog(event);
    } else if (navButtonsList.includes(event.eventModelFieldKey) && event.eventType === dfgDynamicForm.DYNAMIC_EVENT_TYPES.CLICK && event.eventData) {
      this.location.back();
    }

    return true;
  }

  private openContractDialog(event: dfgDynamicForm.DynamicFormEvent) {
    // TODO: design form for contract page
    const contractListConfigApi = 'http://localhost:3000/formMaster/26';
    // TODO: design mock data for contract page
    const contractListDataApi = 'http://localhost:3000/contractOptions';

    const fetchFormConfig$ = this.appRuntimeInfoService.loadFormConfig(contractListConfigApi).pipe(
      map((applicationForm: dfgDynamicForm.ApplicationForm) => {
        if (applicationForm && applicationForm.formConfig) {
          this.dialogService.dialogFormConfig = JSON.parse(applicationForm.formConfig);
        }
      }));

    const fetchFormData$ = this.appRuntimeInfoService.loadFormConfig(contractListDataApi).pipe(
      map((contractListDataResponse: any[]) => {
        if (contractListDataResponse) {
          this.dialogService.dialogFormData = {};
          this.dialogService.dialogFormData.contractList = [];
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

}
