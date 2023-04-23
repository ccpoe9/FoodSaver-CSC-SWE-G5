// mystores.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MystoresComponent } from './mystores.component';
import { StoresService } from 'src/app/services/stores.service';
import { of } from 'rxjs';

describe('MystoresComponent', () => {
  let component: MystoresComponent;
  let fixture: ComponentFixture<MystoresComponent>;
  let storesService: StoresService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [MystoresComponent],
      providers: [StoresService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MystoresComponent);
    component = fixture.componentInstance;
    storesService = TestBed.inject(StoresService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getAdminStores on storeService', () => {
    const mockStores = [{ id: 1, name: 'Store 1' }, { id: 2, name: 'Store 2' }];
    spyOn(storesService, 'getAdminStores').and.returnValue(of([mockStores]));
    component.ngOnInit();
    expect(storesService.getAdminStores).toHaveBeenCalledWith(Number(localStorage.getItem('id')));
    expect(component.myStores).toEqual(mockStores);
  });
});

