import { Component, OnInit, Input } from '@angular/core';
import { ProductsService } from '../shared/products.service';
import { Platform } from '@angular/cdk/platform';
import { ProductModel } from '../shared/models/product.model';
import { MatDialog } from '@angular/material';
import { RelatedProductsDialogComponent } from '../related-products-dialog/related-products-dialog.component';

@Component({
  selector: 'app-related-products',
  templateUrl: './related-products.component.html',
  styleUrls: ['./related-products.component.scss']
})
export class RelatedProductsComponent implements OnInit {

  @Input() products: string;
  productsIdArray: Array<string> = new Array();
  categoryArray: ProductModel[];
  productsArray: Array<ProductModel> = new Array();
  slides = [
    'assets/carousel/WebSliders2019FEB-1600-500.jpg',
    'assets/carousel/WebSlider19supernovaJAN.jpg',
    'assets/carousel/WebSlider18RopeDec1600-500.jpg',
    'assets/carousel/WebSlider18NOV1600-500.jpg',
    'assets/carousel/WebSlider18GraceCrystal1600-500.jpg',
    'assets/carousel/WebSlider2018LED1600-500.jpg'
  ];
  slideConfig = {
    "slidesToShow": 6, 
    "slidesToScroll": 6, 
    "infinite": true,
    "dots": true};

  constructor(private productsService: ProductsService, public platform: Platform, public dialog: MatDialog) { }

  ngOnInit() {
    this.setCarouselConfig();
    this.getAllCategories();
  }

  setCarouselConfig() {
    if (!this.platform.ANDROID && !this.platform.IOS) {
      this.slideConfig = {
        "slidesToShow": 6, 
        "slidesToScroll": 6, 
        "infinite": true,
        "dots": true};
    } else {
      this.slideConfig = {
        "slidesToShow": 1, 
        "slidesToScroll": 1, 
        "infinite": true,
        "dots": false};
    }
  }

  getAllCategories() {
    this.productsIdArray = this.products.split(",");

    this.productsService.getProductList().subscribe(
      (data: ProductModel[]) => {
        this.categoryArray = data;
        // this.sortProducts();
        this.filterProducts();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  filterProducts() {
    var that = this;
    this.categoryArray.filter((product) => {
      this.productsIdArray.forEach(function (productId) {
        if (product.id == Number(productId)) {
          that.productsArray.push(product);
        }
      }); 
    });

    console.log(this.productsArray);
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

  setProductCategory(productCategory) {
    this.productsService.setProductCategory(productCategory);
  }
  
  slickInit(e) {
    console.log('slick initialized');
  }
  
  breakpoint(e) {
    console.log('breakpoint');
  }
  
  afterChange(e) {
    console.log('afterChange');
  }
  
  beforeChange(e) {
    console.log('beforeChange');
  }

  openProduct(product) {
    const dialogRef = this.dialog.open(RelatedProductsDialogComponent, {
      height: '95vh',
      width: '95vw',
      data: product,
      panelClass: 'addProductContainer'
    });
  }
}
