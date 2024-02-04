import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UseragreeupdateComponent } from './useragreeupdate.component';

describe('UseragreeupdateComponent', () => {
  let component: UseragreeupdateComponent;
  let fixture: ComponentFixture<UseragreeupdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UseragreeupdateComponent]
    });
    fixture = TestBed.createComponent(UseragreeupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
