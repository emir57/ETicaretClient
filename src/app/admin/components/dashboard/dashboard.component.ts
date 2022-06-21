import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { AlertifyOptions, AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent extends BaseComponent implements OnInit {

  constructor(private alertifyService: AlertifyService, public spinner: NgxSpinnerService) {
    super(spinner)
  }

  ngOnInit(): void {

  }

  message() {
    this.alertifyService.message("Mesaj", { messageType: MessageType.Error });
  }
  dismiss() {
    this.alertifyService.dismiss();
  }

}
