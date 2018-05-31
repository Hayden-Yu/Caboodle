import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiProfileComponent } from './api-profile.component';

describe('ApiProfileComponent', () => {
  let component: ApiProfileComponent;
  let fixture: ComponentFixture<ApiProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApiProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
