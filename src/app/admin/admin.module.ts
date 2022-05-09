import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from './layout/layout.module';
import { ComponentsModule } from './components/components.module';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatDialogModule} from '@angular/material/dialog';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LayoutModule,
    ComponentsModule,
    MatDialogModule
  ],exports:[
    LayoutModule
  ]
})
export class AdminModule { }
