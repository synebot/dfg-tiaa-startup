import { animate, state, style, transition, trigger } from '@angular/animations';
import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { MatSidenav } from '@angular/material/sidenav';
import { DomSanitizer } from '@angular/platform-browser';
import { Section } from 'dfg-dynamic-form';
import { AppConfigService } from './app-communication/service/app-config.service';
import { AppRuntimeInfoService } from './app-communication/service/app-runtime-info.service';
import { UIMessageService } from './app-communication/service/ui-message.service';
import { NotificationService } from './shared/form-helpers/notification/notification.service';

/**
 * Developer : Onkar Kulkarni
 */

@Component({
  animations: [
    trigger('flyInOut', [
      state('true', style({ transform: 'translateX(0)' }),
      ),
      transition('void => *', [
        style({ transform: 'translateX(100%)' }),
        animate(250),
      ]),
      transition('* => void', [
        animate(250, style({ transform: 'translateX(100%)' })),
      ]),
    ]),
  ],
  selector: 'app-root',
  styleUrls: ['./app.component.css'],
  templateUrl: './app.component.html',
})

export class AppComponent implements OnInit, OnDestroy {
  @ViewChild('sidenav') public sidenav: MatSidenav;
  public masterSection: Section[];

  private _mobileQueryListener: () => void;
  public mobileQuery: MediaQueryList;

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

  public ngOnInit(): void {
    this.notificationService.startNotificationQueue();
  }

  public onToggle(toggled: boolean): void {
    this.sidenav.toggle();
  }

  public onToggleAside(): void {
    this.uiMessageService.expandedAsideCard = !this.uiMessageService.expandedAsideCard;
  }

  public ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

}

