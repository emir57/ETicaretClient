import { Component, OnInit } from '@angular/core';
import { Create_Product } from 'src/app/contracts/create_product';
import { ProductService } from 'src/app/services/common/models/product.service';

@Component({
  selector: 'product-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit(): void {
  }

  create(name: HTMLInputElement, stock: HTMLInputElement, price: HTMLInputElement) {
    const create_product:Create_Product = new Create_Product();
    create_product.name = name.value;
    create_product.stock = +stock.value;
    create_product.price = +price.value;
    this.productService.createProduct(create_product);
  }

}
