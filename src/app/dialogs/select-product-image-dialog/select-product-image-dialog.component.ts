import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { BaseDialog } from '../base/base-dialog';

@Component({
  selector: 'app-select-product-image-dialog',
  templateUrl: './select-product-image-dialog.component.html',
  styleUrls: ['./select-product-image-dialog.component.css']
})
export class SelectProductImageDialogComponent extends BaseDialog<SelectProductImageDialogComponent> {

  constructor(dialogRef: MatDialogRef<SelectProductImageDialogComponent>) {
    super(dialogRef);
  }

}

export enum SelectProductImageState {
  Close
}
