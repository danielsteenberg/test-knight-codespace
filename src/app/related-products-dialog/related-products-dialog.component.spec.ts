import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatedProductsDialogComponent } from './related-products-dialog.component';

describe('RelatedProductsDialogComponent', () => {
  let component: RelatedProductsDialogComponent;
  let fixture: ComponentFixture<RelatedProductsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelatedProductsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatedProductsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
