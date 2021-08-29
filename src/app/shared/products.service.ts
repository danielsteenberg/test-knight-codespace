import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, ReplaySubject } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin':'*'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private searchSubject = new ReplaySubject(1);
  public searchObservable = this.searchSubject.asObservable();

  private productSubject = new ReplaySubject(1);
  public productObservable = this.productSubject.asObservable();

  private productCategorySubject = new ReplaySubject(1);
  public productCategoryObservable = this.productCategorySubject.asObservable();

  private latestNewsImageSubject = new ReplaySubject(1);
  public latestNewsImageObservable = this.latestNewsImageSubject.asObservable();

  private productPreviousSubject = new ReplaySubject(1);
  public productPreviousObservable = this.productPreviousSubject.asObservable();

  private categorySubject = new ReplaySubject(1);
  public categoryObservable = this.categorySubject.asObservable();

// URL paths removed

  constructor(private http: HttpClient) { }

  getCategoryList() {
    return this.http.get(this.klightCategoryUrl, httpOptions);
  }

  getProductList() {
    return this.http.get(this.klightProductUrl, httpOptions);
  }

  getNewArrivals() {
    return this.http.get(this.klightNewArrivalsUrl, httpOptions);
  }

  getMarketing() {
    return this.http.get(this.klightMarketingUrl, httpOptions);
  }

  getLatestNews() {
    return this.http.get(this.klightLatestNewsUrl, httpOptions);
  }

  getProjects() {
    return this.http.get(this.klightProjectsUrl, httpOptions);
  }

  getWhereToBuy(id) {
    return this.http.get(this.klightWhereToBuyUrl + '?id=' + id, httpOptions);
  }

  setProductSearch(searchTerm) {
    this.searchSubject.next(searchTerm);
  }

  setProductItem(product) {
    localStorage.setItem("product", JSON.stringify(product));
    this.productSubject.next(product);
  }

  setProductCategory(productCategory) {
    localStorage.setItem("categoryId", productCategory);
    this.productCategorySubject.next(productCategory);
  }

  setProductPrevious(previousUrl) {
    localStorage.setItem("previousUrl", previousUrl);
    this.productPreviousSubject.next(previousUrl);
  }

  setCategory(category) {
    localStorage.setItem("category", category);
    this.productPreviousSubject.next(category);
  }

  setLatestNewsImage(image) {
    this.latestNewsImageSubject.next(image);
  }

  getRegion() {
    return this.http.get(this.klightRegionUrl, httpOptions);
  }

  getHeadings() {
    return this.http.get(this.klightHeadingsUrl, httpOptions);
  }

  movePageToId(id) {
    setTimeout(() => {
      const element = document.getElementById(id.toString());
      if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 2000);
  }

}
