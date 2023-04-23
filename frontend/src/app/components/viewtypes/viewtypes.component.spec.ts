import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { ProductsService } from 'src/app/services/products.service';

import { ViewtypesComponent } from './viewtypes.component';

describe('ViewtypesComponent', () => {
  let component: ViewtypesComponent;
  let fixture: ComponentFixture<ViewtypesComponent>;
  let mockActivatedRoute;
  let mockProductsService: any;

  beforeEach(async () => {
    mockActivatedRoute = {
      queryParams: of({ type: 'mockType' })
    };

    mockProductsService = jasmine.createSpyObj(['getProductsByType']);

    await TestBed.configureTestingModule({
      declarations: [ ViewtypesComponent ],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: ProductsService, useValue: mockProductsService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewtypesComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set type and call getProductsByType on init', () => {
    spyOn(component, 'getProductsByType');

    fixture.detectChanges();

    expect(component.type).toEqual('mockType');
    expect(component.getProductsByType).toHaveBeenCalled();
  });

  it('should call productsService.getProductsByType', () => {
    mockProductsService.getProductsByType.and.returnValue(of([/* mock products */]));

    component.getProductsByType('mockType');

    expect(mockProductsService.getProductsByType).toHaveBeenCalledWith('mockType');
    expect(component.products).toEqual([/* mock products */]);
  });
});
