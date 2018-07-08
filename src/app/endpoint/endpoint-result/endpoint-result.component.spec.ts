import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EndpointResultComponent } from './endpoint-result.component';

describe('EndpointResultComponent', () => {
  let component: EndpointResultComponent;
  let fixture: ComponentFixture<EndpointResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EndpointResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EndpointResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
