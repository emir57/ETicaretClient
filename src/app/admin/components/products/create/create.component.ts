import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from 'src/app/base/base.component';
import { Create_Product } from 'src/app/contracts/create_product';
import { ProductService } from 'src/app/services/common/models/product.service';

@Component({
  selector: 'product-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent extends BaseComponent implements OnInit {

  constructor(
    public spinner: NgxSpinnerService,
    private productService: ProductService
  ) {
    super(spinner)
  }

  ngOnInit(): void {
  }

  create(name: HTMLInputElement, stock: HTMLInputElement, price: HTMLInputElement) {
    const create_product: Create_Product = new Create_Product();
    create_product.name = name.value;
    create_product.stock = +stock.value;
    create_product.price = +price.value;
    this.productService.createProduct(create_product);
  }

}
