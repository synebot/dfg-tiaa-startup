import { Component, OnInit, HostListener, Inject  } from '@angular/core';
import { DOCUMENT                                 } from '@angular/common';

import { UIMessageService                         } from '../../../app-communication/service/ui-message.service';
import { AppRuntimeInfoService                    } from '../../../app-communication/service/app-runtime-info.service';


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html'
})
export class ToolBarComponent implements OnInit {

  lastLoginTime: any;
  infoToolbarScrollTop: boolean;

  constructor(@Inject(DOCUMENT) private document: any, public uiMessageService: UIMessageService, private appRuntimeInfoService: AppRuntimeInfoService) { }

  ngOnInit() {
    this.lastLoginTime = new Date().toLocaleString();
    this.infoToolbarScrollTop = false;
  }

  @HostListener('window:scroll', ['$event']) onMouseLeave(e: any) {
    // console.log(e);
    let scrollTopPosition: number = this.document.documentElement.scrollTop || this.document.body.scrollTop;
    // this.document.documentElement.scrollTop
    this.uiMessageService.scrollTopPosition = scrollTopPosition;

    if (scrollTopPosition > 68) {
      this.infoToolbarScrollTop = true;
    } else {
      this.infoToolbarScrollTop = false;
    }

    this.uiMessageService.toolbarScrollTop = this.infoToolbarScrollTop;

    // console.log(scrollTopPosition, this.document.documentElement.scrollTop, this.document.body.scrollTop );
  }

}
