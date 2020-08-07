import { Component, OnInit, Input, OnChanges, OnDestroy } from '@angular/core';
import { Route, Router, ActivatedRoute, ParamMap } from '@angular/router';

import { UIMessageService } from '../../../../app-communication/service/ui-message.service';
import { AppRuntimeInfoService } from '../../../../app-communication/service/app-runtime-info.service';
import { AsideService } from '../../../../shared/aside/aside.service';
import { FormDesignerService } from '../../service/form-designer.service';

import { FormEditorControl, ApplicationForm } from 'dfg-dynamic-form';
import { FormRow, FormDesigner } from 'dfg-dynamic-form';
import { AppFormBase } from 'dfg-dynamic-form';
import { FormDesignerAsideConfig } from 'dfg-dynamic-form';



import { BehaviorSubject } from 'rxjs';

/**
 * Developer : Onkar Kulkarni
 */

@Component({
  selector: 'app-form-designer',
  templateUrl: './form-designer.component.html'
})
export class FormDesignerComponent implements OnInit, OnDestroy, AppFormBase {

  formDesigner: FormDesigner;
  // formConfig: FormControlEditor[];
  formConfig: any[];
  updateFormConfig: any;
  selectedFormControl: FormEditorControl;

  constructor(private uiMessageService: UIMessageService, private asideService: AsideService,
    private formDesignerService: FormDesignerService, private appRuntimeInfoService: AppRuntimeInfoService,
    private route: ActivatedRoute) {

    // Expand Aside card when designer loaded
    this.uiMessageService.expandedAsideCard = true;
  }

  ngOnInit() {
    this.formDesigner = new FormDesigner();
    this.asideService.asideFormConfig = new FormDesignerAsideConfig().getStringConfig();
    this.appFormComponentInit();
  }

  appFormComponentInit() {
    this.appRuntimeInfoService.setSection('formDesigner');
    this.initializeRoute();
  }

  initializeRoute() {
    this.route.paramMap
      .subscribe((params: ParamMap) => {
        if (params.get('id')) {
          this.loadData(+params.get('id'));
        } else {
          this.addNewForm();
        }
      });
  }


  addNewForm() {
    this.addNewRow();
  }

  loadData(id: number) {
    this.formDesignerService.getFormConfig(id).subscribe((applicationForm: ApplicationForm) => {
      console.log(applicationForm);
      this.formDesigner = new FormDesigner(applicationForm);
      this.formConfig = JSON.parse(applicationForm.formConfig);
    });
  }

  saveFormConfig() {
    if (this.formDesigner) {
      this.processFormConfig();
      this.formDesigner.formConfig = this.formConfig;
      this.formDesignerService.saveFormConfig(this.formDesigner);
    }
  }

  showUpdatedConfig() {
    // this.updateFormConfig = this.formConfig;
    this.processFormConfig();
    this.updateFormConfig = JSON.stringify(this.formConfig, null, 4);
    console.log(this.updateFormConfig);
  }

  loadRawConfig() {
    this.formConfig = JSON.parse(this.updateFormConfig);
  }

  onFormItemSelect(formControl: FormEditorControl) {

    // Unselected previously selected form control
    if (this.selectedFormControl) {
      this.selectedFormControl.isControlSelected = false;
    }

    formControl.isControlSelected = true;
    this.selectedFormControl = formControl;
    this.asideService.asideFormData = formControl;
    // console.log('onFormItemSelect', formControl);
  }

  addNewFieldToRow(formRow: FormRow, newField?: FormEditorControl) {
    let newFieldConfig = newField ? newField : this.getNewField();
    this.onFormItemSelect(newFieldConfig);
    formRow.fields.push(newFieldConfig);
  }

  addNewRow(rowIndex?: number) {
    let newFieldConfig = this.getNewField();

    let newFormRow = new FormRow({
      columnSize: 1,
      fields: [newFieldConfig]
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

  getNewField(): FormEditorControl {
    let newFieldConfig = new FormEditorControl();
    newFieldConfig.controlType = 'text';
    newFieldConfig.label = 'New Field';
    newFieldConfig.modelFieldKey = 'newField';
    return newFieldConfig;
  }


  removeField(row: FormRow, column: FormEditorControl) {
    let index = row.fields.indexOf(column);
    if (index > -1) {
      row.fields.splice(index, 1);
    }
  }

  removeRow(rowIndex: number) {
    if (this.formConfig.length !== -1) {
      this.formConfig.splice(rowIndex, 1);
    }
  }

  moveFieldLeft(row: FormRow, column: FormEditorControl, columnIndex: number) {
    this.moveItem(row.fields, columnIndex, (columnIndex - 1));
  }

  moveFieldRight(row: FormRow, column: FormEditorControl, columnIndex: number) {
    let rightIndex = (columnIndex + 1) >= row.fields.length ? 0 : columnIndex + 1;
    this.moveItem(row.fields, columnIndex, rightIndex);
  }

  moveFieldUp(rowIndex: number, columnIndex: number) {
    if (rowIndex !== 0) {
      let fieldToMove = this.formConfig[rowIndex]['fields'][columnIndex];
      this.removeField(this.formConfig[rowIndex], fieldToMove);
      this.addNewFieldToRow(this.formConfig[rowIndex - 1], fieldToMove);
    }
  }

  moveFieldDown(rowIndex: number, columnIndex: number) {
    if (this.formConfig.length > rowIndex + 1) {
      let fieldToMove = this.formConfig[rowIndex]['fields'][columnIndex];
      this.removeField(this.formConfig[rowIndex], fieldToMove);
      this.addNewFieldToRow(this.formConfig[rowIndex + 1], fieldToMove);
    }
  }

  moveItem(array: any[], oldIndex: number, newIndex: number): any[] {

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

  onDrag(event: any) {
    console.log(event);
  }

  onDrop(event: any) {
    console.log(event);
  }

  processFormConfig() {
    let processExpansionPanel = false;
    for (const formRow of this.formConfig) {

      if (formRow.fields) {
        for (const controlConfig of formRow.fields) {

          if (controlConfig['controlType'].indexOf('expansion-panel') !== -1) {
            formRow['rowType'] = controlConfig['controlType'];
            processExpansionPanel = true;
          }

          delete controlConfig['isControlSelected'];
          delete controlConfig['validationMessage'];
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

  processExpansionPanelConfig() {

    let tempRows: FormRow[] = [];
    let rowIndex = 0;
    let trackStartExpansionPanel = null;
    let trackEndExpansionPanel = null;

    let formConfigTemp: FormRow[] = [];

    for (const formRow of this.formConfig) {
      formConfigTemp.push(formRow);
    }

    for (const formRow of this.formConfig) {

      if (formRow['rowType'] && formRow['rowType'].indexOf('expansion-panel-start') !== -1) {
        trackStartExpansionPanel = rowIndex;
      }

      if (formRow['rowType'] && formRow['rowType'].indexOf('expansion-panel-end') !== -1) {
        trackEndExpansionPanel = rowIndex;

      }
      // add next row to temp Array
      if (trackStartExpansionPanel && !trackEndExpansionPanel && rowIndex > trackStartExpansionPanel) {
        tempRows.push(formRow);
      }

      if (trackEndExpansionPanel && rowIndex === trackEndExpansionPanel) {


        let newFormRow = new FormRow({
          rowSize: trackEndExpansionPanel - trackStartExpansionPanel,
          rowType: 'expansion-panel',
          formRows: tempRows,
          rowConfig: this.formConfig[trackStartExpansionPanel].fields[0]
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


  ngOnDestroy() {
    this.uiMessageService.expandedAsideCard = false;
  }
}
