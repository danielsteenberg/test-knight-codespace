import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewArivalsComponent } from './new-arivals.component';

describe('NewArivalsComponent', () => {
  let component: NewArivalsComponent;
  let fixture: ComponentFixture<NewArivalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewArivalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewArivalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
