import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { AppConfigService } from './app-config.service';

import { Section, EnumFormConfigSource, FrameworkBootstrapService } from 'dfg-dynamic-form';
import { FormRow, sanitizeObjectForEnvironmentConfig } from 'dfg-dynamic-form';


import * as  localFormConfigData$ from '../../sample-config/section-config/local-form-mapping.config';


@Injectable()
export class AppRuntimeInfoService {

    private _isProdMode: boolean;
    public get IsProdMode(): boolean {
        return this._isProdMode;
    }
    public set IsProdMode(value: boolean) {
        this._isProdMode = value;
    }

    private _masterConfig: Section[];
    public get masterConfig(): Section[] {

        return this._masterConfig;
    }

    public set masterConfig(value: Section[]) {
        this._masterConfig = value;
    }

    public get activeRouteSection(): Section {
        return this.routeSubSection ? this.routeSubSection : this.routeSection;
    }

    private _manageAppSection: Section;
    private _formDesignerSection: Section;

    routeSection: Section;

    routeSubSection: Section;

    isSubSectionLoaded: boolean;

    /**
     * Returns value of current route
     */
    get currentRouteUrl(): string {
        let route = location.hash;
        return route.replace('#', '');
    }

    constructor(private route: ActivatedRoute, private httpClient: HttpClient, private frameworkBootstrapService: FrameworkBootstrapService) { }

    setSection(sectionRoutePath: string) {
        this.routeSection = null;
        this.routeSubSection = null;

        if (sectionRoutePath) {
            this.routeSection = this.getRouteSection(sectionRoutePath);
            sanitizeObjectForEnvironmentConfig(this.routeSection, this.frameworkBootstrapService.environmentConfigData);
            this.isSubSectionLoaded = false;
            this.getSectionConfig(this.routeSection);
            // console.log('this.setSection', this.routeSection);
        }
    }

    setSubSection(sectionRoutePath: string) {
        this.routeSubSection = null;

        if (sectionRoutePath) {
            this.routeSubSection = this.getRouteSection(sectionRoutePath);
            sanitizeObjectForEnvironmentConfig(this.routeSubSection, this.frameworkBootstrapService.environmentConfigData);
            this.getSectionConfig(this.routeSubSection);
            if (this.routeSubSection) {
                this.isSubSectionLoaded = true;
            }
        }
    }

    private getRouteSection(sectionRoutePath: string, sectionConfig: Section[] = null): Section {

        let configSections = sectionConfig ? sectionConfig : this.masterConfig;
        for (const section of configSections) {
            if (sectionRoutePath === section.sectionRoutePath) {
                return section;
            } else if (section.subSectionConfig) {
                let retSection = this.getRouteSection(sectionRoutePath, section.subSectionConfig);
                if (retSection) {
                    return retSection;
                }
            }
        }
    }

    // Objects and arrays are passed by reference. Primitive values like number, string, boolean are passed by value.
    private getSectionConfig(section: Section) {
        // console.log(sectionType, section);
        if (section) {
            if (section.formConfigSource === EnumFormConfigSource.LOCAL) {

                section.formConfigData = localFormConfigData$.LocalFormConfigMapping[section.formConfigPath]
                    ? localFormConfigData$.LocalFormConfigMapping[section.formConfigPath] : null;

            }
        }
    }

    loadFormConfig(loadUrl: string) {
        return this.httpClient.get(loadUrl);
    }

    toggleDesignerMode() {
        if (!this._formDesignerSection || !this._manageAppSection) {

            for (const section of this.masterConfig) {
                if (section.sectionName === 'Manage App Section') {
                    this._manageAppSection = section;
                } else if (section.sectionName === 'Form Designer') {
                    this._formDesignerSection = section;
                }
            }
        }

        this._manageAppSection.isDeleted = this._isProdMode;
        this._formDesignerSection.isDeleted = this._isProdMode;

        this._manageAppSection.isVisible = !this._isProdMode;
        this._formDesignerSection.isVisible = !this._isProdMode;

        console.log(this._manageAppSection, this._formDesignerSection);

    }

}
