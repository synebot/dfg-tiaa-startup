import { Component, OnInit, ViewChild, ChangeDetectorRef, OnDestroy} from '@angular/core';
import { RouterOutlet                 } from '@angular/router';
import { DomSanitizer                 } from '@angular/platform-browser';
import { MatIconRegistry, MatDialog   } from '@angular/material';
import { MatSidenav                   } from '@angular/material/sidenav';
import { MediaMatcher                 } from '@angular/cdk/layout';
import { trigger, state, style, animate, transition } from '@angular/animations';


import { AppConfigService             } from './app-communication/service/app-config.service';
import { UIMessageService             } from './app-communication/service/ui-message.service';
import { NotificationService, NOTIFICATION_TYPE          } from './shared/form-helpers/notification/notification.service';
import { Section                      } from 'dfg-dynamic-form';
import { AppRuntimeInfoService } from './app-communication/service/app-runtime-info.service';


/**
 * Developer : Onkar Kulkarni
 */

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  animations: [
    trigger('flyInOut', [
      state('true', style({transform: 'translateX(0)'})
      ),
      transition('void => *', [
        style({transform: 'translateX(100%)'}),
        animate(250)
      ]),
      transition('* => void', [
        animate(250, style({transform: 'translateX(100%)'}))
      ])
    ])
  ]
})

export class AppComponent implements OnInit, OnDestroy {
  @ViewChild('sidenav') sidenav: MatSidenav;
  masterSection: Section[];

  private _mobileQueryListener: () => void;
  mobileQuery: MediaQueryList;

  constructor(
    public appConfigService: AppConfigService, public uiMessageService: UIMessageService,
    private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer, private dialog: MatDialog,
    private changeDetectorRef: ChangeDetectorRef, private media: MediaMatcher,
    private notificationService: NotificationService, public appRuntimeInfoService: AppRuntimeInfoService) {

  // To avoid XSS attacks, the URL needs to be trusted from inside of your application.
    const avatarsSafeUrl = sanitizer.bypassSecurityTrustResourceUrl('./icon/assets/avatars.svg');
    const coreSafeUrl = sanitizer.bypassSecurityTrustResourceUrl('./icon/assets/core-icon-set.svg');
    const thumbUpUrl = sanitizer.bypassSecurityTrustResourceUrl('./icon/assets/thumbup-icon-set.svg');

    iconRegistry.addSvgIconSetInNamespace('avatars', avatarsSafeUrl)
                .addSvgIconSetInNamespace('core', coreSafeUrl)
                .addSvgIcon('thumb-up', thumbUpUrl)
                .registerFontClassAlias('fontawesome', 'fa');


    // detect if mobile devide
    this.mobileQuery = media.matchMedia('(max-width: 667px)');
    this.uiMessageService.isOnMobileDevice = this.mobileQuery.matches;

    this._mobileQueryListener = () => {
      console.log(this.mobileQuery);
      this.uiMessageService.isOnMobileDevice = this.mobileQuery.matches;
      changeDetectorRef.detectChanges();
    };
    this.mobileQuery.addListener(this._mobileQueryListener);

  }

  ngOnInit() {
    this.notificationService.startNotificationQueue();
  }

  onToggle(toggled: boolean) {
    this.sidenav.toggle();
  }

  onToggleAside() {
    this.uiMessageService.expandedAsideCard = !this.uiMessageService.expandedAsideCard;
  }


  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

}

