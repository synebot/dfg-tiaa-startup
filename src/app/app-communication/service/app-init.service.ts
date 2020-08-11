import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EnvironmentConfig, FrameworkBootstrapService } from 'dfg-dynamic-form';
import { FrameWorkConfig } from 'dfg-dynamic-form';
// import { AppConfigService } from './app-config.service';
// import { Section } from 'dfg-dynamic-form';
import { ApplicationSection, EnvironmentConfigData } from 'dfg-dynamic-form';
import { config, forkJoin } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AppInitService {

  constructor(private httpClient: HttpClient, private frameworkBootstrapService: FrameworkBootstrapService) { }

  public applicationSections: ApplicationSection[];

  private frameWorkConfig(): FrameWorkConfig {
    const frameWorkConfig = new FrameWorkConfig();
    frameWorkConfig.serverURL = 'http://localhost:3000';
    frameWorkConfig.applicationApi = frameWorkConfig.serverURL + '/applicationMaster';
    frameWorkConfig.moduleApi = frameWorkConfig.serverURL + '/moduleMaster';
    frameWorkConfig.sectionApi = frameWorkConfig.serverURL + '/sectionMaster';
    frameWorkConfig.formApi = frameWorkConfig.serverURL + '/formMaster';
    frameWorkConfig.listItemValueApi = frameWorkConfig.serverURL + '/listItemValue';
    frameWorkConfig.environmentConfigApi = frameWorkConfig.serverURL + '/environmentConfig';
    return frameWorkConfig;

  }

  public initializeApp(): Promise<any> {
    console.log(`getSettings:: before http.get call`);

    this.frameworkBootstrapService.setFramework(this.frameWorkConfig());
    this.frameworkBootstrapService.setDefaultApplication('Test Application', 'Test Application Description');
    this.frameworkBootstrapService.setDefaultModule('Module 1', 'Module Description');

    const promiseEnvironmentConfig = this.frameworkBootstrapService.getEnvironmentConfig()
      .toPromise()
      .then((environmentConfig: EnvironmentConfig[]) => {

        console.log(`EnvironmentConfig Settings: `, this.frameworkBootstrapService.environmentConfig);
        console.log(`EnvironmentConfig Data: `, this.frameworkBootstrapService.environmentConfigData);

        return environmentConfig;
      });

    const promiseSections = this.frameworkBootstrapService.getSections()
      .toPromise()
      .then((sections) => {
        console.log(`Settings sections: `, sections);
        this.applicationSections = sections;
        return sections;
      });

    return forkJoin(promiseEnvironmentConfig, promiseSections).toPromise();
  }
}
