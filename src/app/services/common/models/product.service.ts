import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Create_Product } from 'src/app/contracts/create_product';
import { List_Product } from 'src/app/contracts/list_product';
import { List_Product_Image } from 'src/app/contracts/list_product_image';
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

  async read(page: number = 0, size: number = 5, successCallBack?: (value: { totalCount: number, products: List_Product[] }) => void, errorCallBack?: (errorMessage: string) => void): Promise<{ totalCount: number, products: List_Product[] }> {
    const promiseData: Promise<{ totalCount: number, products: List_Product[] }> = this.httpClientService.get<{ totalCount: number, products: List_Product[] }>({
      controller: "products",
      action: "getall",
      queryString: `page=${page}&size=${size}`
    }).toPromise();
    promiseData.then(d => successCallBack != null ? successCallBack(d) : "")
      .catch((errorResponse: HttpErrorResponse) => errorCallBack != null ? errorCallBack(errorResponse.message) : "");
    return await promiseData;
  }

  delete(id: string) {
    const deleteObservable: Observable<any> = this.httpClientService.delete<any>({
      controller: "products",
      action: "delete"
    }, id);
    return deleteObservable;
  }

  async readImages(id: string, successCallBack?: () => void) {
    const getObservable: Observable<any> = this.httpClientService.get<List_Product_Image[]>({
      action: "productimages",
      controller: "products"
    }, id);
    const images: List_Product_Image[] = (await getObservable.toPromise()).images;
    if (successCallBack)
      successCallBack();
    return images;
  }
  deleteImage(productId: string, imageId: string) {
    const getObservable: Observable<any> =
      this.httpClientService.delete({
        action: "deleteproductimage",
        controller: "products",
        queryString: `imageId=${imageId}`
      }, productId);
    return getObservable;
  }
}
