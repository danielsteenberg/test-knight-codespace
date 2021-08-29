import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../shared/products.service';
import { CategoriesModel } from '../products/category.model';
import { ProductModel } from '../shared/models/product.model';

@Component({
  selector: 'app-create-pdf',
  templateUrl: './create-pdf.component.html',
  styleUrls: ['./create-pdf.component.scss']
})
export class CreatePdfComponent implements OnInit {

  categoryObject: ProductModel = new ProductModel();
  productName: string;

  constructor(private productsService: ProductsService) { }

  ngOnInit() {
    this.getProduct();
  }

  getProduct() {
    if (!localStorage.getItem('product')) {
      this.productsService.productObservable.subscribe(
        (data: ProductModel) => {
          this.categoryObject = data;
          this.productName = data.cat_description;
        }, 
        (error) => {
          console.error("No Product saved");
          this.categoryObject = JSON.parse(localStorage.getItem('product'));
        }
      );
    } else {
      this.categoryObject = JSON.parse(localStorage.getItem('product'));
      this.productName = this.categoryObject.cat_description;
    }
  }
}
