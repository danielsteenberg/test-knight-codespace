import { Component, OnInit } from '@angular/core';
import { CategoriesModel } from './category.model';
import { ProductsService } from '../shared/products.service';
import { CategoryModel } from '../shared/models/categories.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  categoryObject: CategoriesModel = new CategoriesModel();
  categoryArray: CategoryModel[];
  spinner: boolean = true;

  constructor(private productsService: ProductsService, private router: Router) { }

  ngOnInit() {
    this.getAllCategories();
  }

  getAllCategories() {
    this.productsService.getCategoryList().subscribe(
      (data: CategoryModel[]) => {
        this.spinner = false;
        this.categoryArray = data;
        // this.sortProducts();
        this.sortArray();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  sortProducts() {
    this.categoryArray.sort((a, b) => {
      if (Number(a.id) < Number(b.id)) {
        return -1;
      } 
      else if (Number(a.id) > Number(b.id)) {
        return 1;
      } else {
        return 0;
      }
    });
  }

  sortArray() {
    this.categoryArray.sort(function(a, b) {
      var nameA = Number(a.position_id);
      var nameB = Number(b.position_id);
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
    
      // names must be equal
      return 0;
    });
  }

  setProductCategory(productCategory, category) {
    this.productsService.setProductCategory(productCategory);
    let catecoryName = category.cat_name.replace(/\s/g, "-").toLowerCase()
    this.router.navigate(['/products/category/' + catecoryName]);
  }
}
