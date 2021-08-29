import { Component, OnInit, Input } from '@angular/core';
import { ProductsService } from '../shared/products.service';

@Component({
  selector: 'app-enlarged-image',
  templateUrl: './enlarged-image.component.html',
  styleUrls: ['./enlarged-image.component.scss']
})
export class EnlargedImageComponent implements OnInit {

  image: string;

  constructor(private productsService: ProductsService) { }

  ngOnInit() {
    this.getImage();
  }

  getImage() {
    this.image = localStorage.getItem('newsImage');
  //   this.productsService.latestNewsImageObservable.subscribe(
  //     (data: string) => {
  //       this.image = data;
  //     },
  //     (error) => {
  //       console.error("No Image Can be found");
  //     }
  //   );
  }
}
