import { Component, OnInit    } from '@angular/core';
import { FormDesignerService  } from '../../service/form-designer.service';

import { AppRuntimeInfoService  } from '../../../../app-communication/service/app-runtime-info.service';
import { AppFormBase            } from 'dfg-dynamic-form';
import { FormDesigner           } from 'dfg-dynamic-form';
import { MatTableDataSource     } from '@angular/material';

/**
 * Developer : Onkar Kulkarni
 */

@Component({
  selector: 'app-form-designer-dashboard',
  templateUrl: 'form-designer-dashbooard.component.html'
})


export class FormDesignerDashboardComponent implements OnInit, AppFormBase {

  displayedColumns = ['action', 'id', 'formName', 'formDescription'];
  dataSource: MatTableDataSource<FormDesigner>;
  formConfig: FormDesigner[];

  constructor(private formDesignerService: FormDesignerService, private appRuntimeInfoService: AppRuntimeInfoService) { }

  ngOnInit() {
    this.appFormComponentInit();
  }

  appFormComponentInit() {
    this.appRuntimeInfoService.setSection('formDesigner');

    this.formDesignerService.getFormConfig().subscribe((response: FormDesigner[]) => {
      // console.log(response);
      this.formConfig = response;
      this.loadData(response);
    });
  }


  loadData(formConfig: any) {
    this.dataSource = new MatTableDataSource<FormDesigner>(this.formConfig);
    this.dataSource.filterPredicate = (data: FormDesigner, filter: string) => {
                                          return data['isDeleted'] ? false : data.isDeleted !== true;
                                        };

    // Apply filter based on filterPredicate
    this.dataSource.filter = 'true';
  }

  deleteForm(form: FormDesigner) {
    // console.log(form);
    form.isDeleted = true;

    // Apply filter based on filterPredicate
    this.dataSource.filter = 'true';
    this.formDesignerService.saveFormConfig(form);

    return false;
  }
}

