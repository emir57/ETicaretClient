import { Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from 'src/app/base/base.component';
import { List_Product } from 'src/app/contracts/list_product';
import { ProductService } from 'src/app/services/common/models/product.service';

@Component({
  selector: 'product-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends BaseComponent implements OnInit {

  displayedColumns: string[] = ['name', 'stock', 'price', 'createdDate', 'updatedDate'];
  dataSource: MatTableDataSource<List_Product> = new MatTableDataSource;
  constructor(
    public spinner: NgxSpinnerService,
    private productService: ProductService
  ) {
    super(spinner);
  }

  ngOnInit(): void {
    this
    this.productService.read(
      (value) => {

      },
      (error) => {

      })
  }

}
