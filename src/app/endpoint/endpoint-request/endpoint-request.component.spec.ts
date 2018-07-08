import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EndpointRequestComponent } from './endpoint-request.component';

describe('EndpointRequestComponent', () => {
  let component: EndpointRequestComponent;
  let fixture: ComponentFixture<EndpointRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EndpointRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EndpointRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
