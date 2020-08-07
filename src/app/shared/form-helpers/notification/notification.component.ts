import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { UIMessageService } from '../../../app-communication/service/ui-message.service';
import { NotificationService, NotificationMessage, NOTIFICATION_TYPE } from './notification.service';
import { Observable } from 'rxjs/internal/Observable';
import { interval, timer } from 'rxjs';


@Component({
  selector: 'app-notification',
  templateUrl: 'notification.component.html'
})

export class NotificationComponent implements OnInit, OnChanges {

  closeClicked: boolean;

  constructor(private uiMessageService: UIMessageService, private notificationService: NotificationService) { }

  ngOnInit() {
    this.closeClicked = false;
    this.notificationService.sendNotification('Loading Complete', NOTIFICATION_TYPE.INFO);
   }

  ngOnChanges(): void {
    this.closeClicked = false;
  }

  onClose(notification: NotificationMessage) {

    notification.closeClicked = true;

    // Create an Observable that will publish a value on timer expires
    const notificationCloseCounter = timer(450);

    // Subscribe to begin publishing values
    notificationCloseCounter.subscribe(n => {
      notification.visible = false;
      this.resetCurrentNotification(notification);
    });
  }

  private resetCurrentNotification(notification: NotificationMessage) {
    notification =  new NotificationMessage();
  }

}
