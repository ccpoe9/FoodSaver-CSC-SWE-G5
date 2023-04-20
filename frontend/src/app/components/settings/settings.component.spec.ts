import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from 'src/app/services/auth.service';
import { DOCUMENT } from '@angular/common';

import { SettingsComponent } from './settings.component';

describe('SettingsComponent', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;

  const authServiceStub = {
    getUserInfo: jasmine.createSpy('getUserInfo').and.returnValue({subscribe: () => {}}),
    editUserInfo: jasmine.createSpy('editUserInfo').and.returnValue({subscribe: () => {}})
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingsComponent ],
      imports: [ RouterTestingModule ],
      providers: [
        { provide: AuthService, useValue: authServiceStub },
        { provide: DOCUMENT, useValue: {} }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve user info on init', () => {
    component.ngOnInit();
    expect(authServiceStub.getUserInfo).toHaveBeenCalledWith(Number(localStorage.getItem('id')));
  });

  it('should submit user info changes', () => {
    const newUsername = 'testUser';
    const newEmail = 'testUser@example.com';
    const newPhone = '1234567890';
    const newAddress = '123 Main St';
    component.editUserInfo = {
      Username: newUsername,
      Email: newEmail,
      Phone: newPhone,
      Address: newAddress
    };
    component.submitUserInfo();
    expect(authServiceStub.editUserInfo).toHaveBeenCalledWith(Number(localStorage.getItem('id')), component.editUserInfo);
  });

  it('should change the theme', () => {
    spyOn(localStorage, 'setItem');
    spyOn(document.documentElement, 'setAttribute');
    const lightThemeButton = fixture.nativeElement.querySelector('.light-theme');
    const darkThemeButton = fixture.nativeElement.querySelector('.dark-theme');
    expect(component.selectedTheme).toBe('LIGHT THEME');
    expect(component.unselectedTheme).toBe('DARK THEME');
    darkThemeButton.click();
    expect(component.selectedTheme).toBe('DARK THEME');
    expect(component.unselectedTheme).toBe('LIGHT THEME');
    expect(localStorage.setItem).toHaveBeenCalledWith('theme', 'dark');
    expect(document.documentElement.setAttribute).toHaveBeenCalledWith('data-bs-theme', 'dark');
    lightThemeButton.click();
    expect(component.selectedTheme).toBe('LIGHT THEME');
    expect(component.unselectedTheme).toBe('DARK THEME');
    expect(localStorage.setItem).toHaveBeenCalledWith('theme', 'light');
    expect(document.documentElement.setAttribute).toHaveBeenCalledWith('data-bs-theme', 'light');
  });

});
