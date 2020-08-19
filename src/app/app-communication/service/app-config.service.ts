import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';

import { Section, SubSectionConfigPath } from 'dfg-dynamic-form';
import { AppInitService } from './app-init.service';
import { AppRuntimeInfoService } from './app-runtime-info.service';

@Injectable()
export class AppConfigService {

    public serverSectionLoaded = false;

    private _masterConfig: Section[];
    // public get masterConfig(): Section[] {
    //     return this._masterConfig;
    // }

    // public set masterConfig(value: Section[]) {
    //     this._masterConfig = value;
    // }

    constructor(
        private httpClient: HttpClient, private appRuntimeInfoService: AppRuntimeInfoService,
        private appInitService: AppInitService) {
        this.setBaseSection();
    }

    private setBaseSection() {

        if (this.appInitService.applicationSections) {
            this._masterConfig = [];

            for (const section of this.appInitService.applicationSections) {
                let sectionConfig = JSON.parse(section.sectionConfig);
                if (typeof sectionConfig === 'string') {
                    sectionConfig = JSON.parse(sectionConfig);
                }
                section.isDeleted = section.isDeleted ? section.isDeleted : false;
                this._masterConfig.push(new Section(sectionConfig));
            }
            this.serverSectionLoaded = true;

            console.log(this._masterConfig);

            // this._masterConfig = this._masterConfig.sort(
            //     (a, b) => {
            //         return (a.sectionOrder ? Number(a.sectionOrder) : 99) - (b.sectionOrder ? Number(b.sectionOrder) : 99);
            //     });
            this._masterConfig = this._masterConfig.sort(
                (a: Section, b: Section) => {
                    return a.sectionOrder - b.sectionOrder;
                });

            console.log(this._masterConfig);
            this.appRuntimeInfoService.masterConfig = this._masterConfig;

        } else {
            throw new Error('DFG-005: Server configuration not loaded');
        }
    }


    public getAppSections(sectionName: string, subSectionName: string): Observable<Section[]> | any {

        if (this.serverSectionLoaded) {
            this.appRuntimeInfoService.setSection(sectionName);
            this.appRuntimeInfoService.setSubSection(subSectionName);
            return this._masterConfig;
        } else {
            throw new Error('DFG-005: Server configuration not loaded');
        }
    }

    public getTabSections(sectionName: string, subSectionName: string): Observable<Section[]> | any {

        if (this.serverSectionLoaded) {
            // console.log('Loading saved getAppSections');
            this.appRuntimeInfoService.setSection(sectionName);
            this.appRuntimeInfoService.setSubSection(subSectionName);
            return this._masterConfig;
        } else {
            throw new Error('DFG-005: Server configuration not loaded');
        }
    }

    public getSubSectionConfigFromPath(configPath: SubSectionConfigPath[]): Observable<Section[]> {
        const pathObservable: Observable<Section>[] = [];

        if (configPath) {
            configPath.forEach((path) => {
                pathObservable.push(this.httpClient.get<Section>(path.sectionPathLink));
            });

            return forkJoin(pathObservable);
        }

        return;
    }
}

