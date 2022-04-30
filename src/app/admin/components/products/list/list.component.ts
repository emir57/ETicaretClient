import { Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { List_Product } from 'src/app/contracts/list_product';
import { ProductService } from 'src/app/services/common/models/product.service';

@Component({
  selector: 'product-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  displayedColumns: string[] = ['name', 'stock', 'price', 'createdDate', 'updatedDate'];
  dataSource: MatTableDataSource<List_Product> = new MatTableDataSource;
  constructor(
    private productService: ProductService
  ) { }

  ngOnInit(): void {
  }

}
