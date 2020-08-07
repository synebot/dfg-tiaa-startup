import { Component, OnInit      } from '@angular/core';
import { AppRuntimeInfoService  } from '../app-communication/service/app-runtime-info.service';
import { AppFormBase            } from 'dfg-dynamic-form';

@Component({
    selector: 'app-sample-form',
    templateUrl: 'sample-form.component.html'
})

export class SampleFormComponent implements OnInit, AppFormBase {


    constructor(public appRuntimeInfoService: AppRuntimeInfoService) { }

    ngOnInit() {
        this.appFormComponentInit();
    }

    appFormComponentInit() {
        this.appRuntimeInfoService.setSection('sampleStaticForm');
    }
}
