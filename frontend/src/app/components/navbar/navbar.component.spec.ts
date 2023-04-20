import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from 'src/app/services/auth.service';
import { ShoppingService } from 'src/app/services/shopping.service';
import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let router: Router;
  let authService: AuthService;
  let shoppingService: ShoppingService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [NavbarComponent],
      providers: [
        {
          provide: AuthService,
          useValue: {},
        },
        {
          provide: ShoppingService,
          useValue: {},
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    authService = TestBed.inject(AuthService);
    shoppingService = TestBed.inject(ShoppingService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to viewtypes on getAllOfType', () => {
    spyOn(router, 'navigate');
    component.getAllOfType('Produce');
    expect(router.navigate).toHaveBeenCalledWith(['viewtypes'], { queryParams: { type: 'Produce' } });
  });

  it('should navigate to search on searchProducts', () => {
    spyOn(router, 'navigate');
    component.search = 'test';
    component.searchProducts();
    expect(router.navigate).toHaveBeenCalledWith(['search'], { queryParams: { s: 'test' } });
  });

  it('should navigate to landing on signOut', () => {
    spyOn(router, 'navigate');
    component.signOut();
    expect(router.navigate).toHaveBeenCalledWith(['landing']);
  });
});
