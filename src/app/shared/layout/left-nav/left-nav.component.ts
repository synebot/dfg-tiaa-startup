import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { EnumSectionType, FrameworkBootstrapService, Section } from 'dfg-dynamic-form';
import { AppConfigService } from '../../../app-communication/service/app-config.service';
import { AppRuntimeInfoService } from '../../../app-communication/service/app-runtime-info.service';
import { UIMessageService } from '../../../app-communication/service/ui-message.service';

@Component({
  animations: [
    trigger('shrinkOut', [
      state('in', style({ height: '*' })),
      transition('* => void', [
        style({ height: '*' }),
        animate(250, style({ height: 0 })),
      ]),
    ]),
  ],
  selector: 'app-left-nav',
  styleUrls: ['./left-nav.component.css'],
  templateUrl: './left-nav.component.html',
})

export class LeftNavComponent implements OnInit {
  public menuList: Section[];
  public selected: any;

  constructor(
    public appConfigService: AppConfigService, private uiMessageService: UIMessageService,
    public appRuntimeInfoService: AppRuntimeInfoService, private frameworkBootstrapService: FrameworkBootstrapService) {

    // console.log('menuList', this.menuList);
  }

  public ngOnInit() {

    this.menuList = this.appRuntimeInfoService.masterConfig;

    if (!this.menuList) {
      throw new Error('DFG-005: Server configuration not loaded');
    }
  }

  public getMenuLink(section: Section) {
    let sectionLink = section.sectionLink;

    if (section.sectionType !== EnumSectionType.FORM_SECTION) {
      sectionLink = '#';
    }
    return sectionLink;
  }

  public onToggelNavMenu(section: Section) {

    if (section) {
      section.collapsed = !section.collapsed;
    }
    return section.sectionType !== EnumSectionType.MAIN_SECTION;

  }

  public isSelected(section: Section) {
    if (!section.subSectionConfig) {
      return '#' + this.appRuntimeInfoService.currentRouteUrl === section.sectionLink;
    } else {
      return ('#' + this.appRuntimeInfoService.currentRouteUrl).indexOf(section.sectionLink) !== -1;
    }
  }

  public isSubSectionExists(section: Section) {
    if (section.sectionType === EnumSectionType.HORIZONTAL_TAB_SECTION || section.sectionType === EnumSectionType.VERTICAL_TAB_SECTION) {
      return false;
    } else if (section.subSectionConfig && section.subSectionConfig.length > 0) {
      return true;
    }
  }
}
