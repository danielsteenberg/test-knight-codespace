import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
  Platform
} from '@angular/cdk/platform';
import { ProductsService } from '../shared/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {

  term: string;
  toggleMenuItems: string = "none";

  constructor(public platform: Platform, private productsService: ProductsService, private router: Router) { 
    console.log(platform);
  }

  ngOnInit() {
  }

  searchTerm() {
    this.productsService.setProductSearch(this.term);
    if(!this.term) {
      this.router.navigate(['products/search']);
    } else {
      this.router.navigate(['products/search']);
    }
  }

  toggleMenu() {
    if(this.toggleMenuItems == "none") {
      this.toggleMenuItems = "";
    } else {
      this.toggleMenuItems = "none";
    }
  }

  closeMenu() {
    this.toggleMenuItems = "none";
  }
}
