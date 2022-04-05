import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent extends BaseComponent implements OnInit {

  constructor(public spinner: NgxSpinnerService) { super(spinner) }

  ngOnInit(): void {
    this.showSpinner(SpinnerType.BallSpinClockwise)
  }

}
