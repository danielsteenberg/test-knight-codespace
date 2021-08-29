import { Component, OnInit } from '@angular/core';
import { ProductModel } from '../models/product.model';
import { ProductsService } from '../shared/products.service';
import { MatDialog } from '@angular/material';
import { ImageDialogComponent } from '../image-dialog/image-dialog.component';
import { HeadingsModel } from '../shared/models/headings.model';

@Component({
  selector: 'app-marketing',
  templateUrl: './marketing.component.html',
  styleUrls: ['./marketing.component.scss']
})
export class MarketingComponent implements OnInit {

  config: any;
  arrivalsObject: ProductModel = new ProductModel();
  arrivalsArray = new Array();
  marketingHeading: HeadingsModel = new HeadingsModel();

  constructor(private productsService: ProductsService, public dialog: MatDialog) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.getHeading();
    this.getAllCategories();
  }

  getHeading() {
    this.productsService.getHeadings().subscribe(
      (data: HeadingsModel[]) => {
        this.marketingHeading = data.find(headings => headings.type == 'marketing');
      },
      (error) => {
        console.error(error);
      }
    );
  }

  getAllCategories() {
    this.productsService.getMarketing().subscribe(
      (data: ProductModel[]) => {
        this.arrivalsArray = data;
        // this.sortProducts();
        // this.arrivalsArray.reverse();
        this.sortArray();
        this.config = {
          maxSize: 3,
          itemsPerPage: 16,
          currentPage: 1,
          totalItems: this.arrivalsArray.length
        };
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

  pageChanged(event){
    this.config.currentPage = event;
  }

  openImage(imagePath: Array<string>) {
    const dialogRef = this.dialog.open(ImageDialogComponent, {
      height: '95vh',
      data: {image: imagePath},
      panelClass: 'myClass'
    });
  }

  goToFirst(page) {
    page.setCurrent(0);
  }

  goToLast(page) {
    let lastPage = page.getLastPage();
    page.setCurrent(lastPage);
  }

  scrollToTop() {
    window.scrollTo(0, 0);
  }
}
