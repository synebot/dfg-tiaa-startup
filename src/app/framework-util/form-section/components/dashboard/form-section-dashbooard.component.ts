import { Component, OnInit      } from '@angular/core';
import { MatTableDataSource     } from '@angular/material';

import { AppRuntimeInfoService  } from '../../../../app-communication/service/app-runtime-info.service';
import { FormSaveLoadService    } from '../../../../app-communication/service/form-save-load.service';
import { FormSectionService     } from '../../service/form-section.service';

import { AppFormBase            } from 'dfg-dynamic-form';
import { Section                } from 'dfg-dynamic-form';


/**
 * Developer : Onkar Kulkarni
 */

@Component({
  selector: 'app-form-section-dashboard',
  templateUrl: 'form-section-dashbooard.component.html'
})


export class FormSectionDashboardComponent implements OnInit, AppFormBase {

  displayedColumns = ['action', 'id', 'sectionName', 'sectionDescription'];
  dataSource: MatTableDataSource<Section>;
  formConfig: any;

  constructor(private formSaveLoadService: FormSaveLoadService, private appRuntimeInfoService: AppRuntimeInfoService,
              private formSectionService: FormSectionService) { }

  ngOnInit() {
    this.appFormComponentInit();
  }

  appFormComponentInit() {
    this.appRuntimeInfoService.setSection('manageAppSection');

    this.formSectionService.getSectionConfig().subscribe((response) => {
      console.log(response);
      this.formConfig = response;
      this.loadData(response);
    });
  }


  loadData(formConfig: any) {

    this.dataSource = new MatTableDataSource<Section>(this.formConfig);
    this.dataSource.filterPredicate = (data: Section, filter: string) => {
                                          return data['isDeleted'] ? false : data.isDeleted !== true;
                                        };
    // Apply filter based on filterPredicate
    this.dataSource.filter = 'true';

  }

  deleteSection(section: Section) {
    console.log(section);
    section.isDeleted = true;

    // Reply Apply filter based on filterPredicate
    this.dataSource.filter = 'true';
    this.formSectionService.saveSectionConfig(section);

    return false;
  }
}

