import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';


import { Section            } from 'dfg-dynamic-form';
import { AppConfigService   } from '../service/app-config.service';
import { Observable         } from 'rxjs';

@Injectable()
export class TabSectionResolver implements Resolve<Section[]> {


  appRuntimeInfoService: any;
  constructor(private appConfigService: AppConfigService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Section[]> {
    console.log('in TabSectionResolver', route, state);
    let sectionName = route.params['sectionName'];
    let subSectionName = route.params['subSectionName'];

    return this.appConfigService.getTabSections(sectionName, subSectionName);
  }
}
