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

  createProduct(product: Create_Product, successCallBack?: any, errorCallBack?: (errorMessage: string) => void) {
    this.httpClientService.post({
      controller: "products",
      action: "add",
    }, product).subscribe(result => {
      successCallBack();
      alert("başarılı");
    }, (errorResponse: HttpErrorResponse) => {
      const _error: Array<{ Key: string, Value: Array<string> }> = errorResponse.error;
      let message = "";
      _error.forEach((v, index) => {
        v.Value.forEach((_v, _index) => {
          message += `${_v}<br>`;
        })
      });
      if (errorCallBack) {
        errorCallBack(message);
      }
    })
  }
}
