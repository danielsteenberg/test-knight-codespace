import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../shared/products.service';
import { ActivatedRoute, Router } from "@angular/router";
import { ProductModel } from '../shared/models/product.model';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.scss']
})
export class ProductSearchComponent implements OnInit {
  categoryObject: ProductModel = new ProductModel();
  categoryArray: ProductModel[];
  categoryId: number;
  category: string;
  spinner: boolean = true;
  term: string;

  constructor(private productsService: ProductsService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.getCategoryId();
    this.getAllCategories();
    this.getSearchTerm();
  }

  getAllCategories() {
    this.productsService.getProductList().subscribe(
      (data: ProductModel[]) => {
        this.spinner = false;
        this.categoryArray = data;
        this.sortProducts();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  getCategoryId() {
    this.productsService.productCategoryObservable.subscribe(
      (data) => {
        if (!data) {
          this.categoryId = Number(localStorage.getItem("categoryId"));
        } else {
          this.categoryId = Number(data);
        }
        
        this.getAllCategories();
      }, 
      (error) => {
        console.error("Couldn't get Category ID")
        this.router.navigate(['/']);
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

  setProduct(product) {
    this.productsService.setProductItem(product);
    let productDescription = product.cat_description.split(' ').join('-');
    this.router.navigate(['products', 'details', 'item', productDescription]);
  }

  getSearchTerm() {
    this.productsService.searchObservable.subscribe(
      (data: string) => {
        if(!data) {
          this.term = '';
        } else {
          this.term = data;
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }
}

