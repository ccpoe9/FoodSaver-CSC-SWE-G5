import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReportsService } from 'src/app/services/reports.service';
import { StoresService } from 'src/app/services/stores.service';
import { ReportsComponent } from './reports.component';
import { of } from 'rxjs';

describe('ReportsComponent', () => {
  let component: ReportsComponent;
  let fixture: ComponentFixture<ReportsComponent>;
  let reportsServiceSpy: jasmine.SpyObj<ReportsService>;
  let storesServiceSpy: jasmine.SpyObj<StoresService>;

  beforeEach(() => {
    const reportsSpy = jasmine.createSpyObj('ReportsService', ['getReports', 'getAdminReports', 'createReports']);
    const storesSpy = jasmine.createSpyObj('StoresService', ['getAllStores']);

    TestBed.configureTestingModule({
      declarations: [ ReportsComponent ],
      providers: [
        { provide: ReportsService, useValue: reportsSpy },
        { provide: StoresService, useValue: storesSpy }
      ]
    });

    fixture = TestBed.createComponent(ReportsComponent);
    component = fixture.componentInstance;

    reportsServiceSpy = TestBed.inject(ReportsService) as jasmine.SpyObj<ReportsService>;
    storesServiceSpy = TestBed.inject(StoresService) as jasmine.SpyObj<StoresService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get reports for customer', () => {
    localStorage.setItem('user', 'Customer');
    localStorage.setItem('id', '1');

    const mockReports = [{ Title: 'Report 1', Desc: 'Description 1', storeName: 'Store 1', customerID: 1 }];
    reportsServiceSpy.getReports.and.returnValue(of([mockReports]));

    component.ngOnInit();

    expect(component.userType).toBe('Customer');
    expect(component.reports).toEqual(mockReports);
  });

  it('should get admin reports', () => {
    localStorage.setItem('user', 'Admin');
    localStorage.setItem('id', '1');

    const mockReports = [{ Title: 'Report 1', Desc: 'Description 1', storeName: 'Store 1', customerID: 1 }];
    reportsServiceSpy.getAdminReports.and.returnValue(of([mockReports]));

    component.ngOnInit();

    expect(component.userType).toBe('Admin');
    expect(component.reports).toEqual(mockReports);
  });

  it('should create a new report', () => {
    localStorage.setItem('id', '1');

    const mockReports = [{ Title: 'Report 1', Desc: 'Description 1', storeName: 'Store 1', customerID: 1 }];
    reportsServiceSpy.createReports.and.returnValue(of([]));
    reportsServiceSpy.getReports.and.returnValue(of([mockReports]));

    component.newReport.Title = 'New Report';
    component.newReport.Desc = 'New Description';
    component.newReport.storeName = 'New Store';

    component.createReport();

    expect(component.reports).toEqual(mockReports);
    expect(reportsServiceSpy.createReports).toHaveBeenCalledWith(component.newReport);
    expect(reportsServiceSpy.getReports).toHaveBeenCalledWith(1);
  });

  it('should get all stores', () => {
    const mockStores = [{ Name: 'Store 1' }, { Name: 'Store 2' }];
    storesServiceSpy.getAllStores.and.returnValue(of(mockStores));

    component.getStores();

    expect(component.stores).toEqual(mockStores);
  });
});
