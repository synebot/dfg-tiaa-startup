import { Component, OnInit, OnDestroy } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from 'selenium-webdriver/http';


import { AppRuntimeInfoService  } from '../../app-communication/service/app-runtime-info.service';
import { AppConfigService       } from '../../app-communication/service/app-config.service';
import { UIMessageService } from '../../app-communication/service/ui-message.service';
import { Section, AppFormBase } from 'dfg-dynamic-form';

@Component({
    selector: 'app-section-template',
    templateUrl: './tab-section-template.component.html',
    styleUrls: ['tab-section-template.component.css']
})
export class TabSectionTemplateComponent implements OnInit, OnDestroy, AppFormBase {
    sectionName: string;

    tabSection: Section;

    constructor(private route: ActivatedRoute, private router: Router, private appRuntimeInfoService: AppRuntimeInfoService,
        private appConfigService: AppConfigService, private uiMessageService: UIMessageService) {

        this.uiMessageService.showToggelAsideButton = false;
    }

    ngOnInit() {
        this.appFormComponentInit();
    }

    appFormComponentInit() {
        // subscribe to the parameters observable
        this.route.paramMap.subscribe(params => {
            this.sectionName = params.get('sectionName');
            this.appRuntimeInfoService.setSection(this.sectionName);
            this.loadData();
        });
    }

    loadData() {

        if (this.appRuntimeInfoService.routeSection) {
            this.loadTabsSections(this.appRuntimeInfoService.routeSection);
        } else if (this.appRuntimeInfoService.routeSubSection) {
            this.loadTabsSections(this.appRuntimeInfoService.routeSubSection);
        }
    }


    loadTabsSections(section: Section) {

        this.tabSection = section;
        if (section.subSectionConfigPath && section.subSectionConfigPath.length > 0) {
            this.appConfigService.getSubSectionConfigFromPath(section.subSectionConfigPath).subscribe((responseTabSections: Section[]) => {

                if (responseTabSections) {

                    if (!section.subSectionConfig) {
                        section.subSectionConfig = [];
                    }

                    responseTabSections.forEach((tab: Section) => {
                        let tempTab = new Section(tab, this.tabSection.sectionLink);

                        if (!this.tabSection.subSectionConfig.find( temp => temp.sectionLink === tempTab.sectionLink)) {

                            this.tabSection.subSectionConfig.push(tempTab);
                        }
                    });

                    // Navigate to first tab
                    if (!this.appRuntimeInfoService.routeSubSection) {
                        this.router.navigateByUrl(this.tabSection.subSectionConfig[0].sectionLink.replace('#', ''));
                    }
                }
            });
        } else if (section.subSectionConfig) {
            // Navigate to first tab
            if (this.tabSection.subSectionConfig  && this.tabSection.subSectionConfig.length > 0 ) {
                this.router.navigateByUrl(this.tabSection.subSectionConfig[0].sectionLink.replace('#', ''));
            }
        }
    }

    ngOnDestroy() {
        this.uiMessageService.showToggelAsideButton = true;
    }
}
