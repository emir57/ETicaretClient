import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from '../layout/layout.component';
import { ComponentsModule } from './components/components.module';
import { HeaderComponent } from './components/header/header.component';



@NgModule({
  declarations: [
    LayoutComponent,
  ],
  imports: [
    CommonModule,
    ComponentsModule
  ]
})
export class LayoutModule { }
