import { Component, OnInit } from '@angular/core';
import { ProductModel } from '../models/product.model';
import { ProductsService } from '../shared/products.service';
import { HeadingsModel } from '../shared/models/headings.model';

@Component({
  selector: 'app-latest-news',
  templateUrl: './latest-news.component.html',
  styleUrls: ['./latest-news.component.scss']
})
export class LatestNewsComponent implements OnInit {

  arrivalsObject: ProductModel = new ProductModel();
  arrivalsArray = new Array();
  latestNewsHeading: HeadingsModel = new HeadingsModel();

  constructor(private productsService: ProductsService) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.getHeading();
    this.getAllCategories();
  }

  getHeading() {
    this.productsService.getHeadings().subscribe(
      (data: HeadingsModel[]) => {
        this.latestNewsHeading = data.find(headings => headings.type == 'latestNews');
      },
      (error) => {
        console.error(error);
      }
    );
  }

  getAllCategories() {
    this.productsService.getLatestNews().subscribe(
      (data: ProductModel[]) => {
        this.arrivalsArray = data;
        // this.sortProducts();
        // this.arrivalsArray.reverse();
        this.sortArray();
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
    this.arrivalsArray.sort(function(a, b) {
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

  setEnlargedImage(image) {
    this.productsService.setLatestNewsImage(image);
    localStorage.setItem('newsImage', image);
    window.open('/enlarged', '_blank');
  }
}
