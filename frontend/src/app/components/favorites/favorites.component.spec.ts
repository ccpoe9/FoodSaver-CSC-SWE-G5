import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { FavoritesComponent } from './favorites.component';
import { ProductsService } from 'src/app/services/products.service';

fdescribe('FavoritesComponent', () => {
  let component: FavoritesComponent;
  let fixture: ComponentFixture<FavoritesComponent>;
  let productsService: ProductsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FavoritesComponent],
      providers: [ProductsService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoritesComponent);
    component = fixture.componentInstance;
    productsService = TestBed.inject(ProductsService);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should call getFavorites', () => {
      spyOn(component, 'getFavorites');
      component.ngOnInit();
      expect(component.getFavorites).toHaveBeenCalled();
    });
  });

  describe('getFavorites', () => {
    it('should call productsService.getFavorites with the correct ID', () => {
      const userId = 1;
      spyOn(productsService, 'getFavorites').and.returnValue(of([{ id: 1, name: 'Product 1' }]));
      localStorage.setItem('id', userId.toString());
      component.getFavorites();
      expect(productsService.getFavorites).toHaveBeenCalledWith(userId);
    });

    it('should update the favorites array with the data returned by productsService', () => {
      const favorites = [{ id: 1, name: 'Product 1' }, { id: 2, name: 'Product 2' }];
      spyOn(productsService, 'getFavorites').and.returnValue(of([favorites]));
      component.getFavorites();
      expect(component.favorites).toEqual(favorites);
    });
  });
});

