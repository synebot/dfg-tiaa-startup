import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AppConfigService } from './app-config.service';

import { EnumFormConfigSource, FrameworkBootstrapService, Section } from 'dfg-dynamic-form';
import { FormRow, sanitizeObjectForEnvironmentConfig } from 'dfg-dynamic-form';

import * as  localFormConfigData$ from '../../sample-config/section-config/local-form-mapping.config';

@Injectable()
export class AppRuntimeInfoService {

    // tslint:disable-next-line: variable-name
    private _isProdMode: boolean;
    public get IsProdMode(): boolean {
        return this._isProdMode;
    }
    public set IsProdMode(value: boolean) {
        this._isProdMode = value;
    }

    // tslint:disable-next-line: variable-name
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

    public routeSection: Section;

    public routeSubSection: Section;

    public isSubSectionLoaded: boolean;

    public activeSectionName: string;
    public activeSubSectionName: string;
    public activeParamId: string;

    /**
     * Returns value of current route
     */
    get currentRouteUrl(): string {
        const route = location.hash;
        return route.replace('#', '');
    }

    constructor(
        private route: ActivatedRoute, private httpClient: HttpClient, private frameworkBootstrapService: FrameworkBootstrapService) { }

    public setRouteInfo(activeSectionName: string, activeSubSectionName: string, activeParamId: string, url: string) {
        if (activeSectionName || activeSubSectionName) {
            this.activeSectionName = activeSectionName;
            this.activeSubSectionName = activeSubSectionName;
        } else {
            this.processUrlForSection(url);
        }
        this.activeParamId = activeParamId;
        this.setSection(this.activeSectionName);
        this.setSubSection(this.activeSubSectionName);
    }

    private processUrlForSection(url: string) {
        url = url.replace('/app-section/', '');
        url = url.replace('/tab-section/', '');
        const urlSegment = url.split('/');

        this.activeSectionName = urlSegment.length > 0 ? urlSegment[0] : null;
        this.activeSubSectionName = urlSegment.length > 1 ? urlSegment[1] : null;
        this.activeParamId = urlSegment.length > 2 ? urlSegment[2] : (urlSegment[1] || null);

    }

    public setSection(sectionRoutePath: string) {
        this.routeSection = null;
        this.routeSubSection = null;
        this.activeSectionName = sectionRoutePath;
        if (sectionRoutePath) {
            this.routeSection = this.getRouteSection(sectionRoutePath);
            sanitizeObjectForEnvironmentConfig(this.routeSection, this.frameworkBootstrapService.environmentConfigData);
            this.isSubSectionLoaded = false;
            this.getSectionConfig(this.routeSection);
            // console.log('this.setSection', this.routeSection);
        }
    }

    public setSubSection(sectionRoutePath: string) {
        this.routeSubSection = null;
        this.activeSubSectionName = sectionRoutePath;
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

        const configSections = sectionConfig ? sectionConfig : this.masterConfig;
        for (const section of configSections) {
            if (sectionRoutePath === section.sectionRoutePath) {
                return section;
            } else if (section.subSectionConfig) {
                const retSection = this.getRouteSection(sectionRoutePath, section.subSectionConfig);
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

    public loadFormConfig(loadUrl: string) {
        return this.httpClient.get(loadUrl);
    }

    public toggleDesignerMode() {
        let manageAppSection: Section;
        let formDesignerSection: Section;

        for (const section of this.masterConfig) {
            if (section.sectionName === 'Manage App Section') {
                manageAppSection = section;
            } else if (section.sectionName === 'Form Designer') {
                formDesignerSection = section;
            }
        }

        manageAppSection.isDeleted = this._isProdMode;
        formDesignerSection.isDeleted = this._isProdMode;

        manageAppSection.isVisible = !this._isProdMode;
        formDesignerSection.isVisible = !this._isProdMode;

        console.log(manageAppSection, formDesignerSection);

    }

}
