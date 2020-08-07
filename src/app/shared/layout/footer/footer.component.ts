import { Component, OnInit, enableProdMode, isDevMode } from '@angular/core';
import { AppRuntimeInfoService } from '../../../app-communication/service/app-runtime-info.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent implements OnInit {

  mode: string;

  constructor(private appRuntimeInfoService: AppRuntimeInfoService) {
    if (isDevMode()) {
      this.mode = 'DEV';
    } else {
      this.mode = 'PROD';
    }
   }

  ngOnInit() {
  }

  toggleMode() {
    if (this.mode === 'DEV') {
      this.appRuntimeInfoService.IsProdMode = !this.appRuntimeInfoService.IsProdMode;
      this.appRuntimeInfoService.toggleDesignerMode();
    }
  }
}
