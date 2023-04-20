// landing.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LandingComponent } from './landing.component';
import { AuthService } from 'src/app/services/auth.service';

describe('LandingComponent', () => {
  let component: LandingComponent;
  let fixture: ComponentFixture<LandingComponent>;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [LandingComponent],
      providers: [AuthService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call loginAsCustomer', () => {
    spyOn(authService, 'loginCustomer').and.callThrough();
    component.Username = 'testUser';
    component.Password = 'testPassword';
    component.loginAsCustomer();
    expect(authService.loginCustomer).toHaveBeenCalled();
  });

  it('should call signUpAsCustomer', () => {
    spyOn(authService, 'signUpCustomer').and.callThrough();
    component.Username = 'testUser';
    component.Password = 'testPassword';
    component.signUpAsCustomer();
    expect(authService.signUpCustomer).toHaveBeenCalled();
  });

  it('should call loginAsAdmin', () => {
    spyOn(authService, 'loginAdmin').and.callThrough();
    component.Username = 'testAdmin';
    component.Password = 'testPassword';
    component.loginAsAdmin();
    expect(authService.loginAdmin).toHaveBeenCalled();
  });
});
