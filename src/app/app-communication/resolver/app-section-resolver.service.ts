import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Section } from 'dfg-dynamic-form';
import { AppConfigService } from '../service/app-config.service';
import { Observable } from 'rxjs';

@Injectable()
export class AppSectionResolver implements Resolve<Section[]> {


  constructor(private appConfigService: AppConfigService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Section[]> {
    // console.log('in AppSectionResolver');
    let sectionName = route.params['sectionName'];
    let subSectionName = route.params['subSectionName'];
    return this.appConfigService.setAppSections(sectionName, subSectionName);
  }
}
