import { Component, Inject, OnDestroy  } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { DialogService                 } from './dialog.service';

@Component({
  selector: 'app-dialog',
  templateUrl: 'dialog.component.html'
})

export class DialogComponent implements OnDestroy {
  constructor(public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public dialogService: DialogService) { }

    closePopup() {
      this.dialogRef.close();
    }

    ngOnDestroy() {
      this.dialogService.dialogFormConfig = null;
      this.dialogService.dialogFormData = null;
    }

}
