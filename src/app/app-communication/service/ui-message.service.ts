import { Injectable } from '@angular/core';

@Injectable()
export class UIMessageService {

    public scrollTopPosition: number;
    public toolbarScrollTop: boolean;
    public expandedLeftSideNav: boolean;
    public expandedAsideCard: boolean;
    public isOnMobileDevice: boolean;
    public showToggleAsideButton: boolean;

    constructor() {
        this.expandedLeftSideNav = true;
        this.expandedAsideCard = false;
        this.showToggleAsideButton = false;
        this.toolbarScrollTop = false;
        this.isOnMobileDevice = false;
    }
}

