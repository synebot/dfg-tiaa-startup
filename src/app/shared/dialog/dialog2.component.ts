import { Component, Inject, OnDestroy  } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { DialogService                 } from './dialog.service';

@Component({
  selector: 'app-dialog',
  templateUrl: 'dialog2.component.html'
})

export class Dialog2Component implements OnDestroy {
  constructor(public dialogRef: MatDialogRef<Dialog2Component>,
    @Inject(MAT_DIALOG_DATA) public data: any, public dialogService: DialogService) { }

    closePopup() {
      this.dialogRef.close();
    }

    ngOnDestroy() {
      this.dialogService.dialog2FormConfig = null;
      this.dialogService.dialog2FormData = null;
    }

}
