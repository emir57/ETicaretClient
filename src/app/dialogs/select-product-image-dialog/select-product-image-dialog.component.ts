import { Component, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';
import { List_Product_Image } from 'src/app/contracts/list_product_image';
import { DialogService } from 'src/app/services/common/dialog/dialog.service';
import { FileUploadOptions } from 'src/app/services/common/file-upload/file-upload.component';
import { ProductService } from 'src/app/services/common/models/product.service';
import { BaseDialog } from '../base/base-dialog';
import { DeleteDialogComponent, DeleteState } from '../delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-select-product-image-dialog',
  templateUrl: './select-product-image-dialog.component.html',
  styleUrls: ['./select-product-image-dialog.component.css']
})
export class SelectProductImageDialogComponent extends BaseDialog<SelectProductImageDialogComponent> implements OnInit {

  images: List_Product_Image[] = [];
  constructor(
    @Inject("baseUrl") public baseUrl: String,
    dialogRef: MatDialogRef<SelectProductImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SelectProductImageState | string,
    private productService: ProductService,
    private spinner: NgxSpinnerService,
    private dialogService: DialogService) {
    super(dialogRef);
  }
  async ngOnInit() {
    this.spinner.show(SpinnerType.BallAtom);
    this.images = await this.productService.readImages(this.data as string,
      () => {
        this.spinner.hide(SpinnerType.BallAtom);
      });
  }

  async deleteImage(id: string) {
    this.dialogService.openDialog({
      componentType: DeleteDialogComponent,
      data: DeleteState.Yes,
      afterClosed: () => {
        this.spinner.show(SpinnerType.BallPulseAsync);
        this.productService.deleteImage(this.data as string, id).subscribe((response) => {
          this.spinner.hide(SpinnerType.BallPulseAsync);
          let i = this.images.findIndex(x => x.id === id);
          this.images.splice(i, 1);
        });
      }
    })
  }

  @Output() options: Partial<FileUploadOptions> = {
    accept: ".png, .jpg, .jpeg, .gif",
    action: "upload",
    controller: "products",
    explanation: "Ürün resmini seçin veya buraya sürükleyin..",
    isAdminPage: true,
    queryString: `id=${this.data}`
  }

}

export enum SelectProductImageState {
  Close
}
