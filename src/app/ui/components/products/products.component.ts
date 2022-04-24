import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { Product } from 'src/app/contracts/create_product';
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
    this.httpClientService.get<Product[]>({
      controller: "products",
      action: "getall",
      //fullEndPoint:"https://jsonplaceholder.typicode.com/posts"
    }).subscribe(response => console.table(response))

    // this.httpClientService.delete({
    //   controller: "products",
    //   action: "delete"
    // }, "08da1bc7-1641-42a2-8b90-579866e23166")
    //   .subscribe(response => console.log(response))
  }

}
