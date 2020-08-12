import { Injectable } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormEditorControl } from 'dfg-dynamic-form';
import { DialogComponent } from './dialog.component';
import { Dialog2Component } from './dialog2.component';

@Injectable()
export class DialogService {

    public dialogFormConfig: any[] | FormEditorControl[];
    public dialogFormData: any;

    public dialog2FormConfig: any[] | FormEditorControl[];
    public dialog2FormData: any;

    constructor(private dialog: MatDialog) {

    }

    // initDialogService(dlgFormConfig: FormEditorControl[], dlgFormData: any) {
    //     if (!this.dialogFormConfig || !this.dialogFormData) {
    //         this.dialogFormConfig = dlgFormConfig;
    //         this.dialogFormData = dlgFormData;
    //     } else {
    //         this.dialog2FormConfig = dlgFormConfig;
    //         this.dialog2FormConfig = dlgFormData;
    //     }
    // }

    // public openDialog(): MatDialogRef<any> {
    //     let dialogRef: MatDialogRef<any>;

    //     if (this.dialogFormData || this.dialogFormConfig) {
    //         dialogRef = this.dialog.open(DialogComponent);
    //     }

    //     return dialogRef;
    // }

    // openDialogSupport2(): MatDialogRef<any> {
    //     let dialogRef: MatDialogRef<any>;

    //     if (this.dialog2FormData || this.dialog2FormConfig) {
    //         dialogRef = this.dialog.open(Dialog2Component, {
    //             width: '650px',
    //             data: { type: 'ObjectTableDialog' }
    //         });
    //     } else {
    //         dialogRef = this.dialog.open(Dialog2Component, {
    //             width: '650px',
    //             data: { type: 'ObjectTableDialog' }
    //         });
    //     }

    //     return dialogRef;
    // }

}
