import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionEndpointListComponent } from './collection-endpoint-list.component';

describe('CollectionEndpointListComponent', () => {
  let component: CollectionEndpointListComponent;
  let fixture: ComponentFixture<CollectionEndpointListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollectionEndpointListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionEndpointListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
