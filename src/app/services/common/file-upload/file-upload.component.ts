import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { FileUploadDialogComponent, FileUploadDialogState } from 'src/app/dialogs/file-upload-dialog/file-upload-dialog.component';
import { AlertifyService, MessageType, Position } from '../../admin/alertify.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../ui/custom-toastr.service';
import { HttpClientService } from '../http-client.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  files: NgxFileDropEntry[] = [];
  @Input() options: Partial<FileUploadOptions> = {};
  constructor(
    private httpClientService: HttpClientService,
    private alertifyService: AlertifyService,
    private customToastrService: CustomToastrService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  selectedFiles(files: NgxFileDropEntry[]) {
    this.files = files;
    const fileData: FormData = new FormData();
    for (const file of files) {
      (file.fileEntry as FileSystemFileEntry)
        .file((_file) => {
          fileData.append(_file.name, _file, file.relativePath);
        })
    }

    this.httpClientService.post({
      controller: this.options.controller,
      action: this.options.action,
      queryString: this.options.queryString,
      headers: new HttpHeaders({ "responseType": "blob" })
    }, fileData).subscribe(response => {
      const message = "Dosyalar başarıyla yüklenmiştir.";
      if (this.options.isAdminPage) {
        this.alertifyService.message(message,
          {
            dismissOthers: true, messageType: MessageType.Success,
            position: Position.TopRight
          })
      } else {
        this.customToastrService.message(message, "Başarılı!",
          { messageType: ToastrMessageType.Success, position: ToastrPosition.TopRight })
      }
    }, (errResponse: HttpErrorResponse) => {
      const message = "Dosyalar yüklenirken beklenmeyen bir hata meydana geldi.";
      if (this.options.isAdminPage) {
        this.alertifyService.message(message,
          {
            dismissOthers: true, messageType: MessageType.Error,
            position: Position.TopRight
          })
      } else {
        this.customToastrService.message(message, "Başarısız!",
          { messageType: ToastrMessageType.Error, position: ToastrPosition.TopRight })
      }
    })
  }

  openDialog(afterClosed: any): void {
    const dialogRef = this.dialog.open(FileUploadDialogComponent, {
      width: '250px',
      data: FileUploadDialogState.Yes,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == FileUploadDialogState.No) {
        afterClosed();
      }
    });
  }

}

export class FileUploadOptions {
  controller?: string;
  action?: string;
  queryString?: string;
  explanation?: string;
  accept?: string;
  isAdminPage?: boolean = false;
}
