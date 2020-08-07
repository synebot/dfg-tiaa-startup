import { Injectable } from '@angular/core';
import { interval } from 'rxjs';

@Injectable({providedIn: 'root'})
export class NotificationService {

  notification: NotificationMessage;

  blockedNotification: NotificationMessage;

  constructor() {
    this.notification = new NotificationMessage();
    this.notification.message = 'Loading application...';
    this.notification.messageTitle = 'Status: ';
    this.notification.type = NOTIFICATION_TYPE.INFO;
    this.blockedNotification = new NotificationMessage();
  }

  startNotificationQueue() {

    const notificationRemoveCounter = interval(3500);

    notificationRemoveCounter.subscribe(n => {
      if (this.notification.visible === true && this.notification.type !== NOTIFICATION_TYPE.DANGER) {
        this.notification.visible = false;
      }
    });


  }

  sendNotification(message: string, type: NOTIFICATION_TYPE, messageTitle?: string) {
    this.notification.message = message;
    this.notification.type = type;
    this.notification.messageTitle = messageTitle ? messageTitle : this.notification.messageTitle;
    this.notification.visible = true;
  }

  sendNotificationMessage(notification: NotificationMessage) {
    this.notification = Object.assign({}, notification);
    this.notification.visible = true;
  }

  setHttpBlockerRequest(requestMethod: string, message?: NotificationMessage) {

    if (!this.blockedNotification) {
      this.blockedNotification = new NotificationMessage();
    }

    if (!message) {

      this.blockedNotification.messageTitle = 'Status';
      this.blockedNotification.message = 'POST|PUT|PATCH'.indexOf(requestMethod) === -1 ?  'Loading...' : 'Saving...';
      this.blockedNotification.stackTrace = null;
      this.blockedNotification.type = NOTIFICATION_TYPE.INFO;
      this.blockedNotification.visible = true;
      this.blockedNotification.showLoading = true;
      this.blockedNotification.closeClicked = false;
    }

    // this.blockedNotification.messageTitle = message.messageTitle ? message.messageTitle : 'Status';
    // this.blockedNotification.message = message.message ? message.message : 'Loading...';
    // this.blockedNotification.stackTrace = message.stackTrace ? message.stackTrace : null;
    // this.blockedNotification.type = message.type ? message.type : NOTIFICATION_TYPE.INFO;
    // this.blockedNotification.visible = message.visible ? message.visible : true;
    // this.blockedNotification.showLoading = message.showLoading ? message.showLoading : true;

  }


  removeHttpBlockerRequest(responseStatus: string, message: string) {
    this.blockedNotification.messageTitle = 'Status - '  + responseStatus;
    this.blockedNotification.message = message;

    if (responseStatus === 'failed') {
      this.blockedNotification.type = NOTIFICATION_TYPE.DANGER;
      this.blockedNotification.showLoading = false;
      this.sendNotificationMessage(this.blockedNotification);

    } else {
      this.blockedNotification.type = NOTIFICATION_TYPE.SUCCESS;
      if (this.notification.messageTitle === 'Status - failed') {
        this.sendNotificationMessage(this.blockedNotification);
      }

      this.blockedNotification = new NotificationMessage();
    }
  }
}

export class NotificationMessage {
  messageTitle: string;
  message: string;
  stackTrace: string;
  type: NOTIFICATION_TYPE;
  visible = true;
  closeOnTimer: boolean;
  closeClicked: boolean;
  showLoading: boolean;

  constructor() {
    this.visible = false;
    this.closeClicked = false;
    this.showLoading = false;
    this.type = NOTIFICATION_TYPE.INFO;
  }

}




export enum NOTIFICATION_TYPE {
  PRIMARY = 'primary',
  SECONDARY =	'secondary',
  SUCCESS =	'success',
  DANGER =	'danger',
  WARNING	=	'warning',
  INFO =	'info',
  LIGHT =	'light',
  DARK =	'dark'
}
