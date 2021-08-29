import { Component, OnInit } from '@angular/core';
import { FooterService } from '../shared/footer.service';
import { FooterModel } from './footer.model';
import { ProductsService } from '../shared/products.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { CategoryModel } from '../shared/models/categories.model';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  
  subscriber: FooterModel = new FooterModel();
  email: string;
  categories: Array<CategoryModel> = new Array();

  constructor(private footerService: FooterService, private productService: ProductsService, private snackBar: MatSnackBar, private router: Router) { }

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this.productService.getCategoryList().subscribe(
      (data: CategoryModel[]) => {
        this.categories = data;
        console.log(this.categories);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  setCategory(categoryId, route: string) {
    window.scrollTo(0, 0);
    route = route.toLowerCase().replace(/ /g, "-");
    this.productService.setProductCategory(categoryId);
    this.router.navigateByUrl('/products/category/' + route);
  }

  subscribeMe() {
    this.subscriber.email = this.email;
    this.footerService.addSubscriber(this.subscriber).subscribe(
      (response) => {
        this.email = '';
        const message = "Thank you for subscribing.";
        const action = "Close";
        this.snackBar.open(message, action, {
          duration: 2000,
        });
        console.log(response);
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
