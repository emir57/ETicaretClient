import { Component, EventEmitter, OnInit, Output, Type } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { Create_Product } from 'src/app/contracts/create_product';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { FileUploadOptions } from 'src/app/services/common/file-upload/file-upload.component';
import { ProductService } from 'src/app/services/common/models/product.service';


@Component({
  selector: 'product-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent extends BaseComponent implements OnInit {

  @Output() createdProduct: EventEmitter<Create_Product> = new EventEmitter();
  @Output() fileUploadOptions: Partial<FileUploadOptions> = {
    action: "upload",
    controller: "products",
    explanation: "Resimleri sürükleyin veya seçin",
    isAdminPage: true,

  }

  constructor(
    public spinner: NgxSpinnerService,
    private productService: ProductService,
    private alertifyService: AlertifyService
  ) {
    super(spinner)
  }

  ngOnInit(): void {
  }

  create(name: HTMLInputElement, stock: HTMLInputElement, price: HTMLInputElement) {
    this.showSpinner(SpinnerType.BallSpinClockwise);
    const create_product: Create_Product = new Create_Product();
    create_product.name = name.value;
    create_product.stock = +stock.value;
    create_product.price = +price.value;
    this.productService.createProduct(create_product, () => {
      this.hideSpinner(SpinnerType.BallSpinClockwise);
      this.alertifyService.message("Ürün başarıyla eklenmiştir.", {
        messageType: MessageType.Success,
        position: Position.TopRight
      });
      this.createdProduct.emit(create_product);
    }, (errorMessage) => {
      this.alertifyService.message(errorMessage, {
        messageType: MessageType.Error,
        position: Position.TopRight
      })
    });
  }

}
