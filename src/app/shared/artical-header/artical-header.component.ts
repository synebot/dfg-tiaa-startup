import { Component, OnInit } from '@angular/core';
import { AppRuntimeInfoService } from '../../app-communication/service/app-runtime-info.service';

@Component({
    selector: 'app-artical-header',
    templateUrl: 'artical-header.component.html'
})

export class ArticalHeaderComponent implements OnInit {
    constructor(public appRuntimeInfoService: AppRuntimeInfoService) { }

    isSubSectionLoaded: boolean;

    ngOnInit() {
        this.isSubSectionLoaded = this.appRuntimeInfoService.isSubSectionLoaded;
    }

}
