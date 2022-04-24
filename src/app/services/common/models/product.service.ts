import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Create_Product } from 'src/app/contracts/create_product';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private httpClientService: HttpClientService
  ) { }

  createProduct(product: Create_Product, successCallBack?: any) {
    this.httpClientService.post({
      controller: "products",
      action: "add",
    }, product).subscribe(result => {
      successCallBack();
      alert("başarılı");
    }, (errorResponse: HttpErrorResponse) => {
      const _error: Array<{key: string, value: Array<string>}> = errorResponse.error;

    })
  }
}
