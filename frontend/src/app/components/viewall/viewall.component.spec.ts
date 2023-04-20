import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { ProductsService } from 'src/app/services/products.service';
import { ViewallComponent } from './viewall.component';

describe('ViewallComponent', () => {
  let component: ViewallComponent;
  let fixture: ComponentFixture<ViewallComponent>;
  let activatedRoute: ActivatedRoute;
  let productsService: ProductsService;

  beforeEach(async () => {
    // Initialize the TestBed with the ViewallComponent and dependencies
    await TestBed.configureTestingModule({
      declarations: [ViewallComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of({ storeID: 1, storeName: 'Test Store', StoreLogo: 'test-logo.png' }),
          },
        },
        {
          provide: ProductsService,
          useValue: {
            getProductsByStoreAndType: () => of([[], {}, [{ TotalPages: 1, TotalRecords: 0 }]]),
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    // Create a fixture of the ViewallComponent
    fixture = TestBed.createComponent(ViewallComponent);
    component = fixture.componentInstance;
    activatedRoute = TestBed.inject(ActivatedRoute);
    productsService = TestBed.inject(ProductsService);
  });

  it('should retrieve store information and products by type', () => {
    // Call the getStoreInfo method and wait for the products to be updated
    component.getStoreInfo();
    fixture.detectChanges();

    // Expect the component properties to be updated with the store information and products
    expect(component.StoreID).toEqual(1);
    expect(component.StoreName).toEqual('Test Store');
    expect(component.StoreLogo).toEqual('test-logo.png');
    expect(productsService.getProductsByStoreAndType).toHaveBeenCalledTimes(component.productTypes.length);
    expect(component.products).toEqual([[], [], [], [], [], [], [], [], [], []]);
    expect(component.totalPages).toEqual([1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
    expect(component.totalRecords).toEqual([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  });

  it('should retrieve products by type when getNextPage is called', () => {
    // Call the getNextPage method and wait for the products to be updated
    spyOn(productsService, 'getProductsByStoreAndType').and.returnValue(
      of([[{ id: 1, name: 'Test Product' }], {}, [{ TotalPages: 1, TotalRecords: 1 }]])
    );
    component.getNextPage(0, 2, 'Produce');
    fixture.detectChanges();

    // Expect the component properties to be updated with the new products
    expect(productsService.getProductsByStoreAndType).toHaveBeenCalledWith(1, 2, 'Produce');
    expect(component.products[0]).toEqual([{ id: 1, name: 'Test Product' }]);
    expect(component.totalPages[0]).toEqual(1);
    expect(component.totalRecords[0]).toEqual(1);
  });
});
