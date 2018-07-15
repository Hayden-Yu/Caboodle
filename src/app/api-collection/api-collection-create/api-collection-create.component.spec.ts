import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiCollectionCreateComponent } from './api-collection-create.component';

describe('ApiCollectionCreateComponent', () => {
  let component: ApiCollectionCreateComponent;
  let fixture: ComponentFixture<ApiCollectionCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApiCollectionCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiCollectionCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
