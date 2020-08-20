import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Route, Router } from '@angular/router';

import { AppRuntimeInfoService } from '../../../../app-communication/service/app-runtime-info.service';
import { UIMessageService } from '../../../../app-communication/service/ui-message.service';
import { AsideService } from '../../../../shared/aside/aside.service';
import { FormDesignerService } from '../../service/form-designer.service';

import { ApplicationForm, FormEditorControl } from 'dfg-dynamic-form';
import { FormDesigner, FormRow } from 'dfg-dynamic-form';
import { AppFormBase } from 'dfg-dynamic-form';
import { FormDesignerAsideConfig } from 'dfg-dynamic-form';

import { BehaviorSubject } from 'rxjs';
import { CSS_CONFIG, FORM_CONFIG, GENERAL_CONFIG } from './../../../../app.constants';

/**
 * Developer : Onkar Kulkarni
 */

@Component({
  selector: 'app-form-designer-updated',
  styleUrls: ['./form-designer-updated.component.css'],
  templateUrl: './form-designer-updated.component.html',
})
export class FormDesignerUpdatedComponent implements OnInit, OnDestroy, AppFormBase {

  public formDesigner: FormDesigner;
  // formConfig: FormControlEditor[];
  public formConfig: any[];
  public updateFormConfig: any;
  public selectedFormControl: FormEditorControl;
  public dynamicFormConfig: any;
  public dynamicFormData: FormEditorControl;
  public cssConfig: any = CSS_CONFIG;
  public formControlConfig: any = FORM_CONFIG;
  public generalConfig: any = GENERAL_CONFIG;

  constructor(
    private uiMessageService: UIMessageService,
    private asideService: AsideService,
    private formDesignerService: FormDesignerService,
    private appRuntimeInfoService: AppRuntimeInfoService,
    private route: ActivatedRoute) {

    // Expand Aside card when designer loaded
    this.uiMessageService.expandedAsideCard = true;
  }

  public ngOnInit() {
    this.formDesigner = new FormDesigner();
    this.asideService.asideFormConfig = new FormDesignerAsideConfig().getStringConfig();
    this.dynamicFormConfig = new FormDesignerAsideConfig().getStringConfig();
    console.log('asideFormConfig: ', JSON.stringify(this.asideService.asideFormConfig));
    this.appFormComponentInit();
  }

  public appFormComponentInit() {
    this.appRuntimeInfoService.setSection('formDesigner');
    this.initializeRoute();
  }

  public initializeRoute() {
    this.route.paramMap
      .subscribe((params: ParamMap) => {
        if (params.get('id')) {
          this.loadData(+params.get('id'));
        } else {
          this.addNewForm();
        }
      });
  }

  public addNewForm() {
    this.addNewRow();
  }

  public loadData(id: number) {
    this.formDesignerService.getFormConfig(id).subscribe((applicationForm: ApplicationForm) => {
      console.log(applicationForm);
      this.formDesigner = new FormDesigner(applicationForm);
      this.formConfig = JSON.parse(applicationForm.formConfig);
    });
  }

  public saveFormConfig() {
    if (this.formDesigner) {
      this.processFormConfig();
      this.formDesigner.formConfig = this.formConfig;
      this.formDesignerService.saveFormConfig(this.formDesigner);
    }
  }

  public showUpdatedConfig() {
    // this.updateFormConfig = this.formConfig;
    this.processFormConfig();
    this.updateFormConfig = JSON.stringify(this.formConfig, null, 4);
    console.log(this.updateFormConfig);
  }

  public loadRawConfig() {
    this.formConfig = JSON.parse(this.updateFormConfig);
  }

  public onFormItemSelect(formControl: FormEditorControl) {

    // Unselected previously selected form control
    if (this.selectedFormControl) {
      this.selectedFormControl.isControlSelected = false;
    }

    formControl.isControlSelected = true;
    this.selectedFormControl = formControl;
    this.asideService.asideFormData = formControl;
    this.dynamicFormData = formControl;
    console.log('onFormItemSelect', formControl);
  }

  public addNewFieldToRow(formRow: FormRow, newField?: FormEditorControl) {
    const newFieldConfig = newField ? newField : this.getNewField();
    this.onFormItemSelect(newFieldConfig);
    formRow.fields.push(newFieldConfig);
  }

  public addNewRow(rowIndex?: number) {
    const newFieldConfig = this.getNewField();

    const newFormRow = new FormRow({
      columnSize: 1,
      fields: [newFieldConfig],
    });

    this.onFormItemSelect(newFieldConfig);
    if (this.formConfig === void 0) {
      this.formConfig = [];
    }

    this.formConfig.push(newFormRow);
    if (rowIndex !== void 0) {
      this.moveItem(this.formConfig, (this.formConfig.length - 1), rowIndex);
    }
  }

  public getNewField(): FormEditorControl {
    const newFieldConfig = new FormEditorControl();
    newFieldConfig.controlType = 'text';
    newFieldConfig.label = 'New Field';
    newFieldConfig.modelFieldKey = 'newField';
    return newFieldConfig;
  }

  public removeField(row: FormRow, column: FormEditorControl) {
    const index = row.fields.indexOf(column);
    if (index > -1) {
      row.fields.splice(index, 1);
    }
  }

  public removeRow(rowIndex: number) {
    if (this.formConfig.length !== -1) {
      this.formConfig.splice(rowIndex, 1);
    }
  }

  public moveFieldLeft(row: FormRow, column: FormEditorControl, columnIndex: number) {
    this.moveItem(row.fields, columnIndex, (columnIndex - 1));
  }

  public moveFieldRight(row: FormRow, column: FormEditorControl, columnIndex: number) {
    const rightIndex = (columnIndex + 1) >= row.fields.length ? 0 : columnIndex + 1;
    this.moveItem(row.fields, columnIndex, rightIndex);
  }

  public moveFieldUp(rowIndex: number, columnIndex: number) {
    if (rowIndex !== 0) {
      const fieldToMove = this.formConfig[rowIndex].fields[columnIndex];
      this.removeField(this.formConfig[rowIndex], fieldToMove);
      this.addNewFieldToRow(this.formConfig[rowIndex - 1], fieldToMove);
    }
  }

  public moveFieldDown(rowIndex: number, columnIndex: number) {
    if (this.formConfig.length > rowIndex + 1) {
      const fieldToMove = this.formConfig[rowIndex].fields[columnIndex];
      this.removeField(this.formConfig[rowIndex], fieldToMove);
      this.addNewFieldToRow(this.formConfig[rowIndex + 1], fieldToMove);
    }
  }

  public moveItem(array: any[], oldIndex: number, newIndex: number): any[] {

    while (oldIndex < 0) {
      oldIndex += array.length;
    }
    while (newIndex < 0) {
      newIndex += array.length;
    }
    if (newIndex >= array.length) {
      let k = newIndex - array.length;
      while ((k--) + 1) {
        array.push(undefined);
      }
    }
    array.splice(newIndex, 0, array.splice(oldIndex, 1)[0]);
    return array;
  }

  public onDrag(event: any) {
    console.log(event);
  }

  public onDrop(event: any) {
    console.log(event);
  }

  public processFormConfig() {
    let processExpansionPanel = false;
    for (const formRow of this.formConfig) {

      if (formRow.fields) {
        for (const controlConfig of formRow.fields) {

          if (controlConfig.controlType.indexOf('expansion-panel') !== -1) {
            formRow.rowType = controlConfig.controlType;
            processExpansionPanel = true;
          }

          delete controlConfig.isControlSelected;
          delete controlConfig.validationMessage;
          // Remove keys with null value to minimize config footprint
          for (const key in controlConfig) {
            if (controlConfig.hasOwnProperty(key)) {
              if (controlConfig[key] === null || controlConfig[key] === void 0 || controlConfig[key] === '') {
                delete controlConfig[key];
              }
            }
          }
        }
      }
    }

    // if (processExpansionPanel) {
    //   this.processExpansionPanelConfig();
    // }
  }

  public processExpansionPanelConfig() {

    const tempRows: FormRow[] = [];
    let rowIndex = 0;
    let trackStartExpansionPanel = null;
    let trackEndExpansionPanel = null;

    const formConfigTemp: FormRow[] = [];

    for (const formRow of this.formConfig) {
      formConfigTemp.push(formRow);
    }

    for (const formRow of this.formConfig) {

      if (formRow.rowType && formRow.rowType.indexOf('expansion-panel-start') !== -1) {
        trackStartExpansionPanel = rowIndex;
      }

      if (formRow.rowType && formRow.rowType.indexOf('expansion-panel-end') !== -1) {
        trackEndExpansionPanel = rowIndex;

      }
      // add next row to temp Array
      if (trackStartExpansionPanel && !trackEndExpansionPanel && rowIndex > trackStartExpansionPanel) {
        tempRows.push(formRow);
      }

      if (trackEndExpansionPanel && rowIndex === trackEndExpansionPanel) {

        const newFormRow = new FormRow({
          formRows: tempRows,
          rowConfig: this.formConfig[trackStartExpansionPanel].fields[0],
          rowSize: trackEndExpansionPanel - trackStartExpansionPanel,
          rowType: 'expansion-panel',
        });
        formConfigTemp.push(newFormRow);

        this.moveItem(formConfigTemp, (formConfigTemp.length - 1), trackStartExpansionPanel);

        trackStartExpansionPanel = null;
        trackEndExpansionPanel = null;
      }

      rowIndex++;
    }

    console.log(JSON.stringify(formConfigTemp));

    this.formConfig = formConfigTemp;
  }

  public ngOnDestroy() {
    this.uiMessageService.expandedAsideCard = false;
  }

}
