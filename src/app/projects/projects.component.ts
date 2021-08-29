import { Component, OnInit } from '@angular/core';
import { ProductModel } from '../models/product.model';
import { ProductsService } from '../shared/products.service';
import { HeadingsModel } from '../shared/models/headings.model';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  arrivalsObject: ProductModel = new ProductModel();
  arrivalsArray = new Array();
  projectsHeading: HeadingsModel = new HeadingsModel();

  constructor(private productsService: ProductsService) { }

  ngOnInit() {
    this.getHeading();
    this.getAllCategories();
  }

  getHeading() {
    this.productsService.getHeadings().subscribe(
      (data: HeadingsModel[]) => {
        this.projectsHeading = data.find(headings => headings.type == 'projects');
      },
      (error) => {
        console.error(error);
      }
    );
  }

  getAllCategories() {
    this.productsService.getProjects().subscribe(
      (data: ProductModel[]) => {
        this.arrivalsArray = data;
        // this.sortProducts();
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

  getPortfolioDescription(portfolio) {
    if(portfolio.portfolio_description) {
      let portfolioDescriptions = [];

      portfolioDescriptions = portfolio.portfolio_description.split(',');

      return portfolioDescriptions[0];
    } else {
      return "";
    }
  }
}
