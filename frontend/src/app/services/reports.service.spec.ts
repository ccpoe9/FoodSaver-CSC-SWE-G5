import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ReportsService } from './reports.service';
import { Config } from 'src/config/config';

describe('ReportsService', () => {
  let service: ReportsService;
  let httpMock: HttpTestingController;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ReportsService]
    });
    service = TestBed.inject(ReportsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get reports for a customer', () => {
    const customerId = 123;
    const reports = [{ id: 1, title: 'Report 1' }, { id: 2, title: 'Report 2' }];

    service.getReports(customerId).subscribe(response => {
      expect(response).toEqual(reports);
    });

    const request = httpMock.expectOne(`${Config.APIROOT}${Config.APIURLS.REPORTS}?customerID=${customerId}`);
    expect(request.request.method).toBe('GET');
    request.flush(reports);
  });

  it('should get admin reports for a supplier', () => {
    const supplierId = 456;
    const reports = [{ id: 3, title: 'Report 3' }, { id: 4, title: 'Report 4' }];

    service.getAdminReports(supplierId).subscribe(response => {
      expect(response).toEqual(reports);
    });

    const request = httpMock.expectOne(`${Config.APIROOT}${Config.APIURLS.ADMINREPORTS}?supplierID=${supplierId}`);
    expect(request.request.method).toBe('GET');
    request.flush(reports);
  });

  it('should create a report', () => {
    const reportInfo = { title: 'New Report', content: 'Report content' };
    const createdReport = [{ id: 5, ...reportInfo }];

    service.createReports(reportInfo).subscribe(response => {
      expect(response).toEqual(createdReport);
    });

    const request = httpMock.expectOne(`${Config.APIROOT}${Config.APIURLS.REPORTS}`);
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual(reportInfo);
    request.flush(createdReport);
  });

});
