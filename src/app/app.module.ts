import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatCarouselModule } from '@ngmodule/material-carousel';
import { FormsModule } from '@angular/forms';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatDialogModule } from '@angular/material/dialog';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  MatButtonModule, 
  MatCheckboxModule, 
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatSelectModule,
  MatMenuModule,
  MatProgressSpinnerModule,
  MatSnackBarModule,
  MatTooltipModule
} from '@angular/material';
import { PlatformModule } from '@angular/cdk/platform';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CategoryCarouselComponent } from './category-carousel/category-carousel.component';
import { HomeComponent } from './home/home.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ProductsComponent } from './products/products.component';
import { NewArivalsComponent } from './new-arivals/new-arivals.component';
import { MarketingComponent } from './marketing/marketing.component';
import { LatestNewsComponent } from './latest-news/latest-news.component';
import { ProjectsComponent } from './projects/projects.component';
import { WhereToBuyComponent } from './where-to-buy/where-to-buy.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ProductsService } from './shared/products.service';
import { HttpClientModule } from '@angular/common/http';
import { ProductsListComponent } from './products-list/products-list.component';
import { SafePipe } from './safe.pipe';
import { ProductItemComponent } from './product-item/product-item.component';
import { ImageDialogComponent } from './image-dialog/image-dialog.component';
import { CreatePdfComponent } from './create-pdf/create-pdf.component';
import { EnlargedImageComponent } from './enlarged-image/enlarged-image.component';
import { ProductSearchComponent } from './product-search/product-search.component';
import { ProjectPortfolioComponent } from './project-portfolio/project-portfolio.component';
import { RelatedProductsComponent } from './related-products/related-products.component';
import { RelatedProductsDialogComponent } from './related-products-dialog/related-products-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CategoryCarouselComponent,
    HomeComponent,
    AboutUsComponent,
    ProductsComponent,
    NewArivalsComponent,
    MarketingComponent,
    LatestNewsComponent,
    ProjectsComponent,
    WhereToBuyComponent,
    ContactUsComponent,
    ProductsListComponent,
    SafePipe,
    ProductItemComponent,
    ImageDialogComponent,
    CreatePdfComponent,
    EnlargedImageComponent,
    ProductSearchComponent,
    ProjectPortfolioComponent,
    RelatedProductsComponent,
    RelatedProductsDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule, 
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatCarouselModule,
    MatSelectModule,
    FormsModule,
    HttpClientModule,
    PlatformModule,
    MatMenuModule,
    Ng2SearchPipeModule,
    MatProgressSpinnerModule,
    SlickCarouselModule,
    NgxPaginationModule,
    MatDialogModule,
    MatSnackBarModule,
    MatTooltipModule
  ],
  providers: [ProductsService],
  bootstrap: [AppComponent],
  entryComponents: [ImageDialogComponent, RelatedProductsDialogComponent]
})
export class AppModule { }
