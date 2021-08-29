import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../shared/products.service';
import { ProductModel } from '../shared/models/product.model';
import { ImageDialogComponent } from '../image-dialog/image-dialog.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-project-portfolio',
  templateUrl: './project-portfolio.component.html',
  styleUrls: ['./project-portfolio.component.scss']
})
export class ProjectPortfolioComponent implements OnInit {

  imagePathBase: string = 'assets/projects/';
  project: string;
  projects: Array<ProductModel> = new Array();
  projectItem: ProductModel = new ProductModel();
  portfolio: Array<string> = new Array();
  imageArray: Array<string> = new Array();

  constructor(private route: ActivatedRoute, private productService: ProductsService, public dialog: MatDialog) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.route.paramMap.subscribe(params => {
      this.project = params.get("project");
    });

    this.project = this.project.replace("-", " ");

    this.getProject();
  }

  getProject() {
    this.productService.getProjects().subscribe(
      (data: ProductModel[]) => {
        this.projects = data;
        this.getProjectItem();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  getProjectItem() {
    this.projectItem = this.projects.find((project) => project.cat_name == this.project);
    this.portfolio = this.projectItem.portfolio.split(",");
    this.setPortfolioImages();
  }

  setPortfolioImages() {
    for(let i = 0; i < this.portfolio.length; i++) {
      this.imageArray.push(this.imagePathBase + this.portfolio[i]);
    }
  }

  openImage() {
    const dialogRef = this.dialog.open(ImageDialogComponent, {
      height: '95vh',
      data: {image: this.imageArray, productDescription: this.projectItem.portfolio_description},
      panelClass: 'myClass'
    });
  }

  getPortfolioDescription(portfolio, index) {
    if(portfolio.portfolio_description) {
      let portfolioDescriptions = [];

      portfolioDescriptions = portfolio.portfolio_description.split(',');

      if(portfolioDescriptions[index]) {
        return portfolioDescriptions[index];
      } else{
        return "";
      }
    } else {
      return "";
    }
  }
}
