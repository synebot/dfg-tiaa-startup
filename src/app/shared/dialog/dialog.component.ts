import { Component, Inject, OnDestroy  } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { DialogService                 } from './dialog.service';

@Component({
  selector: 'app-dialog',
  templateUrl: 'dialog.component.html',
})

export class DialogComponent implements OnDestroy {
  constructor(public dialogRef: MatDialogRef<DialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, public dialogService: DialogService) { }

    public closePopup() {
      this.dialogRef.close();
    }

    public ngOnDestroy() {
      this.dialogService.dialogFormConfig = null;
      this.dialogService.dialogFormData = null;
    }

}
