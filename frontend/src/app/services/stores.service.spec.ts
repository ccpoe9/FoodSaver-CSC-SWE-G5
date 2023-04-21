import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { StoresService } from './stores.service';
import { Config } from 'src/config/config';

describe('StoresService', () => {
  let service: StoresService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [StoresService]
    });
    service = TestBed.inject(StoresService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getStores', () => {
    it('should return an Observable<any[]>', () => {
      const page = 1;
      const mockStores = [{ id: 1, name: 'Store 1' }, { id: 2, name: 'Store 2' }];

      service.getStores(page).subscribe((stores) => {
        expect(stores.length).toBe(2);
        expect(stores).toEqual(mockStores);
      });

      const req = httpMock.expectOne(`${Config.APIROOT}${Config.APIURLS.STORES}?page=${page}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockStores);
    });

    it('should handle errors', () => {
      const page = 1;
      const mockError = { status: 404, message: 'Not Found' };

      service.getStores(page).subscribe(
        (stores) => {
          fail('getStores should have failed');
        },
        (error) => {
          expect(error.status).toBe(mockError.status);
          expect(error.message).toBe(mockError.message);
        }
      );

      const req = httpMock.expectOne(`${Config.APIROOT}${Config.APIURLS.STORES}?page=${page}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockError, { status: 404, statusText: 'Not Found' });
    });
  });

  describe('getAdminStores', () => {
    it('should return an Observable<any[]>', () => {
      const supplierID = 1;
      const mockStores = [{ id: 1, name: 'Store 1' }, { id: 2, name: 'Store 2' }];

      service.getAdminStores(supplierID).subscribe((stores) => {
        expect(stores.length).toBe(2);
        expect(stores).toEqual(mockStores);
      });

      const req = httpMock.expectOne(`${Config.APIROOT}${Config.APIURLS.MYSTORES}?supplierID=${supplierID}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockStores);
    });

    it('should handle errors', () => {
      const supplierID = 1;
      const mockError = { status: 404, message: 'Not Found' };

      service.getAdminStores(supplierID).subscribe(
        (stores) => {
          fail('getAdminStores should have failed');
        },
        (error) => {
          expect(error.status).toBe(mockError.status);
          expect(error.message).toBe(mockError.message);
        }
      );

      const req = httpMock.expectOne(`${Config.APIROOT}${Config.APIURLS.MYSTORES}?supplierID=${supplierID}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockError, { status: 404, statusText: 'Not Found' });
    });
  });

});
