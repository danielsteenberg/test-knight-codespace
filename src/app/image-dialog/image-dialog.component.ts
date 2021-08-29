import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-image-dialog',
  templateUrl: './image-dialog.component.html',
  styleUrls: ['./image-dialog.component.scss']
})
export class ImageDialogComponent implements OnInit {

  arrayLength: number;
  imagePosition: number = 0;
  descriptionArray: Array<string> = new Array();
  itemDescription: string;

  constructor(
    public dialogRef: MatDialogRef<ImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

  ngOnInit() {
    if(this.data.image) {
      this.arrayLength = this.data.image.length;
    }

    this.descriptionArray = this.data.productDescription.split(',');
    this.setItemDescription(0);
  }

  next() {
    if (this.imagePosition != (this.arrayLength - 1)) {
      this.imagePosition ++;
      this.setItemDescription(this.imagePosition);
    }
  }

  previous() {
    if (this.imagePosition != 0) {
      this.imagePosition --;
      this.setItemDescription(this.imagePosition);
    }
  }

  setItemDescription(position) {
    if(position <= (this.descriptionArray.length - 1)) {
      this.itemDescription = this.descriptionArray[position];
    } else {
      this.itemDescription = this.descriptionArray[0];
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
