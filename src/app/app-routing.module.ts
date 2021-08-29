import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ProductsComponent } from './products/products.component';
import { NewArivalsComponent } from './new-arivals/new-arivals.component';
import { MarketingComponent } from './marketing/marketing.component';
import { LatestNewsComponent } from './latest-news/latest-news.component';
import { ProjectsComponent } from './projects/projects.component';
import { WhereToBuyComponent } from './where-to-buy/where-to-buy.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { EnlargedImageComponent } from './enlarged-image/enlarged-image.component';
import { ProductSearchComponent } from './product-search/product-search.component';
import { ProjectPortfolioComponent } from './project-portfolio/project-portfolio.component';

const routes: Routes = [
  {path: '', component: HomeComponent, pathMatch: 'full'},
  {path: 'about-us', component: AboutUsComponent},
  {path: 'products/all', component: ProductsComponent},
  {path: 'products/:id/:category', component: ProductsListComponent},
  {path: 'products/search', component: ProductSearchComponent},
  {path: 'products/category/:category', component: ProductsListComponent},
  {path: 'products/details/item/:item', component: ProductItemComponent},
  {path: 'new-arrivals', component: NewArivalsComponent},
  {path: 'marketing', component: MarketingComponent},
  {path: 'latest-news', component: LatestNewsComponent},
  {path: 'projects', component: ProjectsComponent},
  {path: 'projects/details/:project', component: ProjectPortfolioComponent},
  {path: 'where-to-buy', component: WhereToBuyComponent},
  {path: 'contact-us', component: ContactUsComponent},
  {path: 'enlarged', component: EnlargedImageComponent},
  {path: '**', redirectTo: '/'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
