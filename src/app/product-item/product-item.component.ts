import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../shared/products.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as jspdf from 'jspdf'; 
import html2canvas from 'html2canvas'; 
import { ProductModel } from '../shared/models/product.model';
import { MatDialog } from '@angular/material';
import { ImageDialogComponent } from '../image-dialog/image-dialog.component';
import { CategoryModel } from '../shared/models/categories.model';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {

  categoryObject: ProductModel = new ProductModel();
  routerUrl: string;
  productName: string;
  showPdfContent: boolean = false;
  previouseUrl: string;
  previouseUrlName: string;
  measurmentsArray: Array<string> = new Array();
  colourArray: Array<string> = new Array();
  fittingColourArray: Array<string> = new Array();
  crystalColourArray: Array<string> = new Array();
  lampsArray: Array<string> = new Array();
  wattageArray: Array<string> = new Array();
  ipratingArray: Array<string> = new Array();
  categories: Array<CategoryModel> = new Array();
  productImageDescription: string;
  productItem: ProductModel;
  productParam: string;
  productsRelated: Array<ProductModel> = new Array();
  imagePosition: number = 0;

  constructor(private productsService: ProductsService, private router: Router, public dialog: MatDialog, private route: ActivatedRoute) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.routerUrl = window.location.href;
    this.getProduct();
    this.getProductFromDb();
    this.getProducts();
  }

  getPreviousUrl(product) {
    // if(localStorage.getItem("previousUrl")) {
    //   this.previouseUrl = localStorage.getItem("previousUrl");
    // } else {
      this.getCategories(product);
    // }
    
    // this.productsService.productPreviousObservable.subscribe(
    //   (data: string) => {
    //     this.previouseUrl = data;
    //   }
    // );
  }

  getCategories(product) {
    this.productsService.getCategoryList().subscribe(
      (data: CategoryModel[]) => {
        this.categories = data;

        const categoryIdsArray = product.cat_id.split(',');

        let category = data.find(catId => categoryIdsArray.includes(catId.id.toString()));
        this.previouseUrlName = category.cat_name;
        this.previouseUrl = this.previouseUrlName.toLowerCase().replace(' ', '-');
        this.productsService.setProductCategory(category.id);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  getProductFromDb() {
    this.route.paramMap.subscribe(params => {
      this.productParam = params.get("item");
    })

    this.productsService.getProductList().subscribe(
      (data: ProductModel[]) => {
        this.productItem = data.find(
          (item) => {
            return item.cat_description.split(' ').join('-') == this.productParam;
          }
        );
        this.setProduct(this.productItem);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  setProduct(data) {
    this.categoryObject = data;
    this.productName = data.cat_description;
    this.measurmentsArray = data.measurements.split(',');
    this.colourArray = this.categoryObject.colour.split(',');
    this.fittingColourArray = this.categoryObject.fittingColour.split(',');
    this.crystalColourArray = this.categoryObject.crystalColour.split(',');
    this.lampsArray = this.categoryObject.lamps.split(',');
    this.wattageArray = this.categoryObject.wattage.split(',');
    this.ipratingArray = this.categoryObject.iprating.split(',');
    this.getPreviousUrl(this.categoryObject);
  }

  getProduct() {
    // if (!localStorage.getItem('product')) {
      
    
    this.productsService.productObservable.subscribe(
        (data: ProductModel) => {
          if (!data) {
            this.router.navigate(['/products']);
          } else {
            this.categoryObject = data;
            this.productName = data.cat_description;
            this.measurmentsArray = data.measurements.split(',');
            this.colourArray = this.categoryObject.colour.split(',');
            this.fittingColourArray = this.categoryObject.fittingColour.split(',');
            this.crystalColourArray = this.categoryObject.crystalColour.split(',');
            this.lampsArray = this.categoryObject.lamps.split(',');
            this.wattageArray = this.categoryObject.wattage.split(',');
            this.ipratingArray = this.categoryObject.iprating.split(',');
            this.getPreviousUrl(this.categoryObject);
          }
        }, 
        (error) => {
          console.error("No Product saved");
          this.categoryObject = JSON.parse(localStorage.getItem('product'));
        }
      );


    // } else {
    //   this.categoryObject = JSON.parse(localStorage.getItem('product'));
    //   this.productName = this.categoryObject.cat_description;
    //   this.measurmentsArray = this.categoryObject.measurements.split(',');
    //   this.colourArray = this.categoryObject.colour.split(',');
    //   this.fittingColourArray = this.categoryObject.fittingColour.split(',');
    //   this.crystalColourArray = this.categoryObject.crystalColour.split(',');
    //   this.lampsArray = this.categoryObject.lamps.split(',');
    //   this.wattageArray = this.categoryObject.wattage.split(',');
    //   this.ipratingArray = this.categoryObject.iprating.split(',');
    //   this.getPreviousUrl(this.categoryObject);
    // }
  }

  getProducts() {
    this.productsService.getProductList().subscribe(
      (data: ProductModel[]) => {
        this.productsRelated = data.filter(
          (product) => {
            const categoryIdsArray = this.productItem.cat_id.split(',');

            return categoryIdsArray.includes(product.cat_id);
          }
        );
      }
    );
  }

  captureScreen()  
  {  
    //show pdf div
    this.showPdfContent = true;
    var cat_name = this.categoryObject.cat_name 

    var that = this;

    setTimeout(function () {
      var data = document.getElementById('contentToConvert');  
    html2canvas(data).then(canvas => {  
      // Few necessary setting options  
      var imgWidth = 208;   
      var pageHeight = 295;    
      var imgHeight = canvas.height * imgWidth / canvas.width;  
      var heightLeft = imgHeight;  
  
      const contentDataURL = canvas.toDataURL('image/png')  
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
      var position = 0;  
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight, '','MEDIUM')  
      pdf.save(cat_name+ '.pdf'); // Generated PDF  

      // Hide PDF when done downloading
      that.showPdfContent = false;
    }, 500); 
    });  
  }  

  openImage(product: ProductModel, imagePath) {
    this.productImageDescription = product.cat_name + " | " + product.cat_description;
    const dialogRef = this.dialog.open(ImageDialogComponent, {
      height: '95vh',
      data: {image: imagePath, productDescription: this.productImageDescription},
      panelClass: 'myClass'
    });
  }

  next() {
    if (this.imagePosition != (this.productsRelated.length - 1)) {
      this.imagePosition ++;
      this.setProduct(this.productsRelated[this.imagePosition]);
      this.setProductRoute(this.productsRelated[this.imagePosition]);
    }
  }

  previous() {
    if (this.imagePosition != 0) {
      this.imagePosition --;
      this.setProduct(this.productsRelated[this.imagePosition]);
      this.setProductRoute(this.productsRelated[this.imagePosition]);
    }
  }

  setProductRoute(product) {
    this.productsService.setProductItem(product);
    let productDescription = product.cat_description.split(' ').join('-');
    this.router.navigate(['products', 'details', 'item', productDescription]);
  }
}
