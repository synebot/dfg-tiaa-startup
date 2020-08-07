import { Injectable } from '@angular/core';

@Injectable()
export class UIMessageService {

    scrollTopPosition: number;
    toolbarScrollTop: boolean;
    expandedLeftSideNav: boolean;
    expandedAsideCard: boolean;
    isOnMobileDevice: boolean;
    showToggelAsideButton: boolean;

    constructor() {
        this.expandedLeftSideNav = true;
        this.expandedAsideCard = false;
        this.showToggelAsideButton = true;
        this.toolbarScrollTop = false;
        this.isOnMobileDevice = false;
    }
}

