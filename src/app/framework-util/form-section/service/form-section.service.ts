import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router     } from '@angular/router';

import { FormRow, FormDesigner, FrameworkBootstrapService     } from 'dfg-dynamic-form';
import { ApplicationSection                                   } from 'dfg-dynamic-form';
import { ApplicationForm                                      } from 'dfg-dynamic-form';
import { Section                                              } from 'dfg-dynamic-form';

import { Observable } from 'rxjs';
import { tap, map   } from 'rxjs/operators';


/**
 * Developer : Onkar Kulkarni
 */

@Injectable()
export class FormSectionService {


  constructor(private httpClient: HttpClient, private router: Router, private frameworkBootstrapService: FrameworkBootstrapService) { }


  getSectionConfig(id?: number): Observable<any> {
    // let loadApiUrl = this.getLoadApiUrl();
    let loadApiUrl = this.frameworkBootstrapService.frameWorkConfig.sectionApi;

    let observable: Observable<any>;

    if (id) {
      observable = this.httpClient.get(loadApiUrl + '/' + id)
      .pipe(
        map((applicationSection: ApplicationSection) => {
          console.log(1, applicationSection);
          let section = JSON.parse(applicationSection.sectionConfig);
          if (typeof section === 'string') {
            section = JSON.parse(section);
          }
          section['id'] = applicationSection.sectionId ? applicationSection.sectionId : applicationSection.id;
          return section;
        })
      );
    } else {
      observable = this.httpClient.get(loadApiUrl)
        .pipe(
          map((applicationSections: ApplicationSection[]) => {    // -> Update value before sending it
            let sections: Section[] = [];

            for (const appSection of applicationSections) {
              let section = JSON.parse(appSection.sectionConfig);
              if (typeof section === 'string') {
                section = JSON.parse(section);
              }

              section['id'] = appSection.sectionId ? appSection.sectionId : appSection.id;
              sections.push(section);
            }
            return sections;
          })
        );
    }
    return observable;
  }

  saveSectionConfig(section: Section) {
    // let saveApiURL = this.getSaveApiUrl();

    let saveApiURL = this.frameworkBootstrapService.frameWorkConfig.sectionApi;

    let formSaveObject = new ApplicationSection();
    formSaveObject.sectionId = section.id;
    formSaveObject.id = section.id;
    formSaveObject.sectionName = section.sectionName;
    formSaveObject.sectionDescription = section.sectionDescription;
    formSaveObject.sectionConfig = JSON.stringify(section);
    formSaveObject.isDeleted = section.isDeleted;

    if (formSaveObject) {
      // create New
      if (formSaveObject.id === void 0 || formSaveObject.id === null)  {
          return this.httpClient.post(saveApiURL, formSaveObject).subscribe((response: FormDesigner) => {
            this.router.navigate(['/form-section/formSection', {id: response.id}]);
            console.log(response);
          });
      } else {
        // update
        return this.httpClient.put(saveApiURL + '/' +  section.id, formSaveObject).subscribe((response: any) => {
          console.log(response);
        });
      }
    }
  }
}
