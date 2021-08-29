import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../shared/products.service';
import { HeadingsModel } from '../shared/models/headings.model';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {

  aboutUsHeading: HeadingsModel = new HeadingsModel();

  constructor(private productsService: ProductsService) { }

  ngOnInit() {
    this.productsService.getHeadings().subscribe(
      (data: HeadingsModel[]) => {
        this.aboutUsHeading = data.find(headings => headings.type == 'aboutUs');
        console.log(this.aboutUsHeading);
      },
      (error) => {
        console.error(error);
      }
    );
  }

}
