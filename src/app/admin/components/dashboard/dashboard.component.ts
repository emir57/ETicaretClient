import { Component, OnInit } from '@angular/core';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private alertifyService: AlertifyService) { }

  ngOnInit(): void {
  }

  message() {
    this.alertifyService.message("Mesaj", MessageType.Success, 2, Position.BottomRight, true);
  }
  dismiss() {
    this.alertifyService.dismiss();
  }

}
