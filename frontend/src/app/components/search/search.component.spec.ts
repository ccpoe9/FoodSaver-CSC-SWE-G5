import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { ProductsService } from 'src/app/services/products.service';

import { SearchComponent } from './search.component';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let mockActivatedRoute: any;
  let mockProductsService: any;

  beforeEach(async () => {
    mockActivatedRoute = {
      queryParams: of({ s: 'test' })
    } as unknown as ActivatedRoute;

    mockProductsService = jasmine.createSpyObj('ProductsService', ['getProductsBySearch']);
    mockProductsService.getProductsBySearch.and.returnValue(of([[]]));

    await TestBed.configureTestingModule({
      declarations: [ SearchComponent ],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: ProductsService, useValue: mockProductsService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call productsService.getProductsBySearch with search term from queryParams', () => {
    component.ngOnInit();
    expect(mockProductsService.getProductsBySearch).toHaveBeenCalledWith('test');
  });

  it('should set searchResults with data returned from productsService.getProductsBySearch', () => {
    const data = [['product1'], ['product2']];
    mockProductsService.getProductsBySearch.and.returnValue(of(data));
    component.ngOnInit();
    expect(component.searchResults).toEqual(data[0]);
  });
});
