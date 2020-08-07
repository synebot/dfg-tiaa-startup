import { Component, Input, OnInit, ViewChild      } from '@angular/core';
import { ViewContainerRef                         } from '@angular/core';
import { MatDialog                                } from '@angular/material';

import { AsideService           } from './aside.service';
import { DialogService          } from '../dialog/dialog.service';
import { DialogComponent        } from '../dialog/dialog.component';

@Component({
    selector: 'app-aside',
    templateUrl: 'aside.component.html',
})

export class AppAsideComponent implements OnInit {

  constructor(public asideService: AsideService, private dialogService: DialogService, private asideDialog: MatDialog) {
  }

  ngOnInit() { }

  popOut() {
    this.dialogService.dialogFormConfig = this.asideService.asideFormConfig;
    this.dialogService.dialogFormData = this.asideService.asideFormData;

    let dialogRef = this.asideDialog.open(DialogComponent, {
      width: '640px',
      data: { type: 'AsideDialog' }
    });
  }
}

