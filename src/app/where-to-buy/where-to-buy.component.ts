import { Component, OnInit } from '@angular/core';
import { WhereToBuyModel } from '../models/where-to-buy.model';
import { RetailersModel } from '../models/retailers.model';
import { DomSanitizer } from '@angular/platform-browser';
import { ProductsService } from '../shared/products.service';
import { HeadingsModel } from '../shared/models/headings.model';

@Component({
  selector: 'app-where-to-buy',
  templateUrl: './where-to-buy.component.html',
  styleUrls: ['./where-to-buy.component.scss']
})
export class WhereToBuyComponent implements OnInit {

  term: string;
  regionSet: boolean = false;
  selectedRegion: any;
  selectedRegionValue: string;
  retailersObject: RetailersModel = new RetailersModel();
  allRegions: Array<any> = new Array();
  regions: Array<any> = new Array();
  selectedRegionDropDown: string = "Please Select a Region";
  suburbs: Array<any> = new Array();
  selectedSuburbDropDown: string = "Please Select a Region";
  retailersArray = new Array();
  retailersArrayCopy = new Array();
  whereToBuyItems: WhereToBuyModel[];
  isRegionSelected: boolean = false;
  isSuburbSelected: boolean = false;
  whereToBuyHeading: HeadingsModel = new HeadingsModel();

  constructor(public sanitizer: DomSanitizer, private productsService: ProductsService) { }

  ngOnInit() {
    this.getHeading();
    this.getRegions();
  }

  getHeading() {
    this.productsService.getHeadings().subscribe(
      (data: HeadingsModel[]) => {
        this.whereToBuyHeading = data.find(headings => headings.type == 'whereToBuy');
      },
      (error) => {
        console.error(error);
      }
    );
  }

  getRetailers(id) {
    this.productsService.getWhereToBuy(id).subscribe(
      (data: RetailersModel[]) => {
        this.retailersArray = data.filter((retailers) => Number(retailers.region_id) == id);
        this.retailersArrayCopy = this.retailersArray;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getRegions() {
    this.productsService.getRegion().subscribe(
      (data: Array<any>) => {
        this.allRegions = data;
        this.allRegions.sort();
        this.setRegions(data);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  setRegions(regions) {
    this.regions = new Array();
    for(let i = 0; i < regions.length; i++) {
      if(this.regions.includes(regions[i].region)) {
        continue;
      } else {
        this.regions.push(regions[i].region);
      }
    }
  }

  onRegionSelect(region) {
    this.isRegionSelected = true;
    this.suburbs = new Array();
    for(let i = 0; i < this.allRegions.length; i++) {
      if(this.allRegions[i].region == region) {
        this.suburbs.push(this.allRegions[i].suburb);
      }
    }
    this.suburbs.sort();
  }

  onSuburbSelect(suburb) {
    this.isSuburbSelected = true;
    for(let i = 0; i < this.allRegions.length; i++) {
      if(this.allRegions[i].suburb == suburb) {
        this.filterRetailers(this.allRegions[i].id);
        break;
      }
    }
  }

  filterRetailers(id) {
    this.retailersArray = new Array();
    this.getRetailers(Number(id));
    // for(let i = 0; i < this.retailersArrayCopy.length; i++) {
    //   if (this.retailersArrayCopy[i].region_id == id) {
    //     this.retailersArray.push(this.retailersArrayCopy[i]);
    //   }
    // }
  }

}
