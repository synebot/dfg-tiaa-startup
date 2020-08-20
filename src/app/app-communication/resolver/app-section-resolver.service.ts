import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Section } from 'dfg-dynamic-form';
import { Observable } from 'rxjs';
import { AppConfigService } from '../service/app-config.service';
import { AppRuntimeInfoService } from '../service/app-runtime-info.service';

@Injectable()
export class AppSectionResolver implements Resolve<Section[]> {

  constructor(private appConfigService: AppConfigService, private appRuntimeInfoService: AppRuntimeInfoService) { }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Section[]> {
    const sectionName = route.params.sectionName;
    const subSectionName = route.params.subSectionName;
    const paramId = route.params.paramId;
    this.appRuntimeInfoService.setRouteInfo(sectionName, subSectionName, paramId, state.url);
    return this.appConfigService.getAppSections(this.appRuntimeInfoService.activeSectionName, this.appRuntimeInfoService.activeSubSectionName);
  }
}
