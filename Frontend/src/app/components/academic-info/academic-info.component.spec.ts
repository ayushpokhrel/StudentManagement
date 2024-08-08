import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademicInfoComponent } from './academic-info.component';

describe('AcademicInfoComponent', () => {
  let component: AcademicInfoComponent;
  let fixture: ComponentFixture<AcademicInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AcademicInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AcademicInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
