import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ProductsService } from 'src/app/services/products.service';
import { ShoppingService } from 'src/app/services/shopping.service';
import { StoresService } from 'src/app/services/stores.service';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let router: Router;
  let authService: AuthService;
  let productsService: ProductsService;
  let shoppingService: ShoppingService;
  let storesService: StoresService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [
        {
          provide: Router,
          useValue: {
            navigate: () => {},
          },
        },
        {
          provide: AuthService,
          useValue: {},
        },
        {
          provide: ProductsService,
          useValue: {
            getProducts: () => of([[], {}, [{ TotalPages: 1 }]]),
          },
        },
        {
          provide: ShoppingService,
          useValue: {},
        },
        {
          provide: StoresService,
          useValue: {
            getStores: () => of([[], {}, [{ TotalPages: 1, TotalRecords: 1 }]]),
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    authService = TestBed.inject(AuthService);
    productsService = TestBed.inject(ProductsService);
    shoppingService = TestBed.inject(ShoppingService);
    storesService = TestBed.inject(StoresService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get top stores and products on initialization', () => {
    spyOn(storesService, 'getStores').and.returnValue(of([[], {}, [{ TotalPages: 1, TotalRecords: 1 }]]));
    spyOn(productsService, 'getProducts').and.returnValue(of([[], {}, [{ TotalPages: 1 }]]));
    component.ngOnInit();
    expect(storesService.getStores).toHaveBeenCalled();
    expect(productsService.getProducts).toHaveBeenCalled();
  });

  it('should navigate to viewAllProducts with store details', () => {
    spyOn(router, 'navigate');
    component.viewAllProducts(1, 'Test Store', 'test-logo.png');
    expect(router.navigate).toHaveBeenCalledWith(['/viewall'], { queryParams: { storeID: 1, storeName: 'Test Store', StoreLogo: 'test-logo.png' } });
  });
});
