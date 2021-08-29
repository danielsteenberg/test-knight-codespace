import { Component, OnInit } from '@angular/core';
import { NewArrivalsModel } from './new-arrivals.model';
import { ProductsService } from '../shared/products.service';
import { ProductModel } from '../shared/models/product.model';
import { HeadingsModel } from '../shared/models/headings.model';

@Component({
  selector: 'app-new-arivals',
  templateUrl: './new-arivals.component.html',
  styleUrls: ['./new-arivals.component.scss']
})
export class NewArivalsComponent implements OnInit {

  arrivalsObject: NewArrivalsModel = new NewArrivalsModel();
  arrivalsArray = new Array();
  newArrivalHeading: HeadingsModel = new HeadingsModel();

  constructor(private productsService: ProductsService) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.getHeading();
    // this.getAllCategories();
    this.getProducts();
  }

  getHeading() {
    this.productsService.getHeadings().subscribe(
      (data: HeadingsModel[]) => {
        this.newArrivalHeading = data.find(headings => headings.type == 'newArrivals');
      },
      (error) => {
        console.error(error);
      }
    );
  }

  getProducts() {
    this.productsService.getProductList().subscribe(
      (data: ProductModel[]) => {
        let array = data.filter(function(item) {
          return item.newArrival == "true";
        });
        this.arrivalsArray = array;
        this.sortArray();
        console.log(this.arrivalsArray);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  getAllCategories() {
    this.productsService.getNewArrivals().subscribe(
      (data: NewArrivalsModel[]) => {
        this.arrivalsArray = data;
        this.sortProducts();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  sortProducts() {
    this.arrivalsArray.sort((a, b) => {
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

    this.arrivalsArray.sort(function(a, b) {
      const firstPosition = JSON.parse(a.position_id);
      const secondPosition = JSON.parse(b.position_id);

      for (let i = 0; i < firstPosition.length; i ++) {
        if(firstPosition[i].newArrival == 1 || firstPosition[i].newArrival == '1') {
          for (let j = 0; j < secondPosition.length; j ++) {
            if(secondPosition[j].newArrival == 1 || secondPosition[j].newArrival == '1') {
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
  }
}
