import { Component, OnInit          } from '@angular/core';
import { ActivatedRoute, Router     } from '@angular/router';

import { AppRuntimeInfoService      } from '../../app-communication/service/app-runtime-info.service';
import { ActionConfig               } from 'dfg-dynamic-form';

@Component({
    selector: 'app-section-template',
    templateUrl: './section-template.component.html'
})
export class AppSectionTemplateComponent implements OnInit {
    sectionName: string;

    constructor(private route: ActivatedRoute, private router: Router, private appRuntimeInfoService: AppRuntimeInfoService) { }

    ngOnInit() {
        // Current Section is set at route resolver level
        this.route.paramMap.subscribe(params => {
            this.sectionName = params.get('sectionName');
        });
    }
}
