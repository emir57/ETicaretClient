import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { HttpClientService } from 'src/app/services/common/http-client.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent extends BaseComponent implements OnInit {

  constructor(public spinner: NgxSpinnerService, private httpClientService: HttpClientService) {
    super(spinner);
  }

  ngOnInit(): void {
    this.showSpinner(SpinnerType.BallSpinClockwise);
    this.httpClientService.get({
      controller: "products",
      action: "getall"
    }).subscribe(response => console.log(response))
    // this.httpClientService.put({
    //   controller: "products",
    //   action: "update"
    // }, { id:"08da1bc7-1641-42a2-8b90-579866e23166",name: "Kalem 2", stock: 100, price: 16 })
    //   .subscribe(response => console.log(response))
  }

}
