import { Component, OnInit, Inject } from '@angular/core';
import { ProductModel } from '../shared/models/product.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import html2canvas from 'html2canvas'; 
import * as jspdf from 'jspdf'; 

@Component({
  selector: 'app-related-products-dialog',
  templateUrl: './related-products-dialog.component.html',
  styleUrls: ['./related-products-dialog.component.scss']
})
export class RelatedProductsDialogComponent implements OnInit {

  categoryObject: ProductModel;
  routerUrl: string;
  productName: string;
  showPdfContent: boolean = false;
  routerName: string;

  constructor(
    public dialogRef: MatDialogRef<RelatedProductsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProductModel,
  ) { }

  ngOnInit() {
    this.categoryObject = this.data;
    this.routerUrl = window.location.href;
    this.productName = this.categoryObject.cat_description;
    this.routerName = this.productName.split(' ').join('-');
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
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)  
      pdf.save(cat_name+ '.pdf'); // Generated PDF  

      // Hide PDF when done downloading
      that.showPdfContent = false;
    }, 500); 
    });  
  }  

  closeDialog() {
    this.dialogRef.close();
  }
}
