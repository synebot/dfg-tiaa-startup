import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AppRuntimeInfoService } from './app-runtime-info.service';
import { Section, SubSectionConfigPath } from 'dfg-dynamic-form';
import * as config$ from '../../sample-config/section-config/master-app.config';
import { AppInitService } from './app-init.service';


@Injectable()
export class AppConfigService {

    private appSectionURL = 'http://localhost:3000/FormSection';
    public serverSectionLoaded = false;
    private serverTabSectionLoaded = false;

    private _masterConfig: Section[];
    // public get masterConfig(): Section[] {
    //     return this._masterConfig;
    // }

    // public set masterConfig(value: Section[]) {
    //     this._masterConfig = value;
    // }

    constructor(private httpClient: HttpClient, private appRuntimeInfoService: AppRuntimeInfoService,
        private appInitService: AppInitService) {
        this.setBaseSection();
    }

    private setBaseSection() {

        if (this.appInitService.applicationSections) {
            this._masterConfig = [];

            for (const section of this.appInitService.applicationSections) {
                let sectionConfig = JSON.parse(section['sectionConfig']);
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
                    return a.sectionOrder - b.sectionOrder; // (a.sectionOrder ? Number(a.sectionOrder) : 999) - (b.sectionOrder ? Number(b.sectionOrder) : 999);
                });


            console.log(this._masterConfig);
            this.appRuntimeInfoService.masterConfig = this._masterConfig;

        } else {
            throw new Error('DFG-005: Server configuration not loaded');
        }
    }

    // private getMasterConfig(): Section[] {
    //     let configSections: Array<Section> = new Array<Section>();

    //     for (const c of config$.masterAppConfig) {
    //         let section: Section = new Section(c);

    //         configSections.push(section);
    //     }

    //     // console.log(configSections);
    //    return configSections;
    // }


    /**
     * Get Application Sections from Server
     */
    // public getAppSectionsObservable(): Observable<Section[]> | any {

    //     if (this.serverSectionLoaded) {
    //         // console.log('Loading saved getAppSections');
    //         // return new Observable( observer => observer.next(this._masterConfig));
    //         return this.masterConfig;
    //     }

    //     // return this.httpClient.get(this.appSectionURL)
    //     //   .pipe(
    //     //     tap((response: Section[]) => {
    //     //         this._masterConfig = [];

    //     //         for (const section of response) {
    //     //           this._masterConfig.push(new Section(section));
    //     //         }
    //     //         this.serverSectionLoaded = true;
    //     //         // console.log('Loading From Server getAppSections', response);
    //     //       })
    //     // );

    //     // return this.frameworkBootstrapService.getSectionsByModule()
    //     //   .pipe(
    //     //     tap((response: Section[]) => {
    //     //         this._masterConfig = [];

    //     //         for (const section of response) {
    //     //             let sectionConfig = JSON.parse(section['sectionConfig']);
    //     //           this._masterConfig.push(new Section(sectionConfig));
    //     //         }
    //     //         this.serverSectionLoaded = true;
    //     //         // console.log('Loading From Server getAppSections', response);
    //     //       })
    //     // );
    // }


    setAppSections(sectionName: string, subSectionName: string): Observable<Section[]> | any {

        if (this.serverSectionLoaded) {
            this.appRuntimeInfoService.setSection(sectionName);
            this.appRuntimeInfoService.setSubSection(subSectionName);
            return this._masterConfig;
        } else {
            throw new Error('DFG-005: Server configuration not loaded');
        }
    }

    getTabSections(sectionName: string, subSectionName: string): Observable<Section[]> | any {

        if (this.serverSectionLoaded) {
            // console.log('Loading saved getAppSections');
            this.appRuntimeInfoService.setSection(sectionName);
            this.appRuntimeInfoService.setSubSection(subSectionName);
            return this._masterConfig;
        } else {
            throw new Error('DFG-005: Server configuration not loaded');
        }
    }


    getSubSectionConfigFromPath(configPath: SubSectionConfigPath[]): Observable<Section[]> {
        let pathObservable: Observable<Section>[] = [];

        if (configPath) {
            configPath.forEach(path => {
                pathObservable.push(this.httpClient.get<Section>(path.sectionPathLink));
            });

            return forkJoin(pathObservable);
        }

        return;
    }
}

