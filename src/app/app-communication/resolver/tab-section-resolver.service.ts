import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { Section } from 'dfg-dynamic-form';
import { Observable } from 'rxjs';
import { AppConfigService } from '../service/app-config.service';

@Injectable()
export class TabSectionResolver implements Resolve<Section[]> {

  public appRuntimeInfoService: any;
  constructor(private appConfigService: AppConfigService) { }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Section[]> {
    const sectionName = route.params.sectionName;
    const subSectionName = route.params.subSectionName;
    const paramId = route.params.paramId;
    this.appRuntimeInfoService.setRouteInfo(sectionName, subSectionName, paramId, state.url);
    return this.appConfigService.getTabSections(this.appRuntimeInfoService.activeSectionName, this.appRuntimeInfoService.activeSubSectionName);
  }
}
