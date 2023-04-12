import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewtypesComponent } from './viewtypes.component';

describe('ViewtypesComponent', () => {
  let component: ViewtypesComponent;
  let fixture: ComponentFixture<ViewtypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewtypesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewtypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
