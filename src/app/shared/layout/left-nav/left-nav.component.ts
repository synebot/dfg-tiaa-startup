import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

import { AppConfigService } from '../../../app-communication/service/app-config.service';
import { UIMessageService } from '../../../app-communication/service/ui-message.service';

import { AppRuntimeInfoService } from '../../../app-communication/service/app-runtime-info.service';
import { Section, EnumFormConfigSource, EnumSectionType } from 'dfg-dynamic-form';
import { FrameWorkConfig, FrameworkBootstrapService } from 'dfg-dynamic-form';


@Component({
  selector: 'app-left-nav',
  templateUrl: './left-nav.component.html',
  animations: [
    trigger('shrinkOut', [
      state('in', style({ height: '*' })),
      transition('* => void', [
        style({ height: '*' }),
        animate(250, style({ height: 0 }))
      ])
    ])
  ]
})

export class LeftNavComponent implements OnInit {
  menuList: Section[];
  selected: any;

  constructor(
    public appConfigService: AppConfigService, private uiMessageService: UIMessageService,
    public appRuntimeInfoService: AppRuntimeInfoService, private frameworkBootstrapService: FrameworkBootstrapService) {

    // console.log('menuList', this.menuList);
  }

  ngOnInit() {

    this.menuList = this.appRuntimeInfoService.masterConfig;

    if (!this.menuList) {
      throw new Error('DFG-005: Server configuration not loaded');
    }
  }

  getMenuLink(section: Section) {
    let sectionLink = section.sectionLink;

    if (section.sectionType !== EnumSectionType.FORM_SECTION) {
      sectionLink = '#';
    }
    return sectionLink;
  }

  onToggelNavMenu(section: Section) {

    if (section) {
      section.collapsed = !section.collapsed;
    }
    return section.sectionType !== EnumSectionType.MAIN_SECTION;

  }

  isSelected(section: Section) {
    if (!section.subSectionConfig) {
      return '#' + this.appRuntimeInfoService.currentRouteUrl === section.sectionLink;
    } else {
      return ('#' + this.appRuntimeInfoService.currentRouteUrl).indexOf(section.sectionLink) !== -1;
    }
  }

  isSubSectionExists(section: Section) {
    if (section.sectionType === EnumSectionType.HORIZONTAL_TAB_SECTION || section.sectionType === EnumSectionType.VERTICAL_TAB_SECTION) {
      return false;
    } else if (section.subSectionConfig && section.subSectionConfig.length > 0) {
      return true;
    }
  }
}
