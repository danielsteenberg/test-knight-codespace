import { Component, OnInit } from '@angular/core';
import { MatCarousel, MatCarouselComponent } from '@ngmodule/material-carousel';
import { Platform } from '@angular/cdk/platform';
import { ProductsService } from '../shared/products.service';
import { HeadingsModel } from '../shared/models/headings.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  slides: string;

  constructor(public platform: Platform, private productsService: ProductsService) { }

  ngOnInit() {
    this.productsService.getHeadings().subscribe(
      (data: HeadingsModel[]) => {
        const heading = data.find(headings => headings.type == 'carousel');
        this.slides = JSON.parse(heading.image);
        console.log(this.slides);
      },
      (error) => {
        console.error(error);
      }
    );
  }

}
