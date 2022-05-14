import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AdminModule } from './admin/admin.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UiModule } from './ui/ui.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BaseComponent } from './base/base.component';
import { HttpClientModule } from '@angular/common/http';
import { FileUploadComponent } from './services/common/file-upload/file-upload.component';
import { NgxFileDropModule } from 'ngx-file-drop';
import { FileUploadDialogComponent } from './dialogs/file-upload-dialog/file-upload-dialog.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminModule,
    HttpClientModule,
    UiModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: "toast-bottom-right"
    }),
    NgxSpinnerModule
  ],
  providers: [
    { provide: "baseUrl", useValue: "https://localhost:44392/api", multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
