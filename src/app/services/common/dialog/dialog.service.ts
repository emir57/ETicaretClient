import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ComponentType } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(
    private dialog: MatDialog
  ) { }

  openDialog(dialogParameters: Partial<DialogParameters>): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: dialogParameters.data,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == dialogParameters.data) {
        if (dialogParameters.afterClosed) {
          dialogParameters.afterClosed();
        }
      }
    });
  }
}

export class DialogParameters {
  componentType!: ComponentType<any>;
  data!: any;
  afterClosed!: () => void;
}
