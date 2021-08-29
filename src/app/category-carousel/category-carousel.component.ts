import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../shared/products.service';
import { CategoryModel } from '../shared/models/categories.model';
import { Platform } from '@angular/cdk/platform';

@Component({
  selector: 'app-category-carousel',
  templateUrl: './category-carousel.component.html',
  styleUrls: ['./category-carousel.component.scss']
})
export class CategoryCarouselComponent implements OnInit {

  categoryArray: CategoryModel[];
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

  constructor(private productsService: ProductsService, public platform: Platform) { }

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
    this.productsService.getCategoryList().subscribe(
      (data: CategoryModel[]) => {
        this.categoryArray = data;
        this.sortProducts();
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
}
