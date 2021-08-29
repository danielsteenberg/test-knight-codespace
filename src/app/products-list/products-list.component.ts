import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../shared/products.service';
import { ActivatedRoute, Router } from "@angular/router";
import { ProductModel } from '../shared/models/product.model';
import { CategoryModel } from '../shared/models/categories.model';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {

  categoryObject: ProductModel = new ProductModel();
  categoryArray: ProductModel[];
  categoryId: number;
  category: string;
  spinner: boolean = true;
  term: string;
  categoryName: string;

  constructor(private productsService: ProductsService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.getRouteParams();
  }

  getRouteParams() {
    this.route.paramMap.subscribe(params => {
      this.categoryName = params.get("category");
      this.getCategoryId();
      this.getAllCategories();
      this.resetSearchTerm();
      this.getSearchTerm();
      this.getCategory();
    })
  }

  getAllCategories() {
    let categoryId = this.categoryId;

    this.productsService.setProductPrevious(this.categoryName);
   
    this.category = this.categoryName.replace(/-/g, ' ');
    
    if(categoryId) {
      this.productsService.getProductList().subscribe(
        (data: ProductModel[]) => {
          let array = data.filter(function(item) {
  
            const categoryIdsArray = item.cat_id.split(',');
  
            return categoryIdsArray.includes(categoryId.toString());
          });
          this.spinner = false;
          this.categoryArray = array;
          this.sortArray();
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

  getCategoryId() {
    // this.productsService.productCategoryObservable.subscribe(
    //   (data) => {
    //     if (!data) {
    //       this.categoryId = Number(localStorage.getItem("categoryId"));
    //     } else {
    //       this.categoryId = Number(data);
    //     }
        
    //     this.getAllCategories();
    //   }, 
    //   (error) => {
    //     console.error("Couldn't get Category ID")
    //     this.router.navigate(['/']);
    //   }
    // );

    this.productsService.getCategoryList().subscribe(
      (data: CategoryModel[]) => {
        this.categoryId = data.find(
          (itemId) => {
            return itemId.cat_name.toUpperCase() === this.category.toUpperCase();
          }
          ).cat_id;
          this.getAllCategories();
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
    const that = this;

    this.categoryArray.sort(function(a, b) {
      const firstPosition = JSON.parse(a.position_id);
      const secondPosition = JSON.parse(b.position_id);

      for (let i = 0; i < firstPosition.length; i ++) {
        if(firstPosition[i].category == that.categoryId) {
          for (let j = 0; j < secondPosition.length; j ++) {
            if(secondPosition[j].category == that.categoryId) {
              var nameA = Number(firstPosition[i].position);
              var nameB = Number(secondPosition[j].position);
              if (nameA < nameB) {
                return -1;
              }
              if (nameA > nameB) {
                return 1;
              }
            
              // names must be equal
              return 0;
            }
          }
        }
      }
    });
  }

  setProduct(product) {
    this.productsService.setProductItem(product);
    let productDescription = product.cat_description.split(' ').join('-');
    this.router.navigate(['products', 'details', 'item', productDescription]);
  }

  resetSearchTerm() {
    this.productsService.setProductSearch('');
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

  getCategory() {
    this.productsService.categoryObservable.subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
