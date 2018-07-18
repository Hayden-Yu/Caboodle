import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EndpointCreateComponent } from './endpoint-create.component';

describe('EndpointCreateComponent', () => {
  let component: EndpointCreateComponent;
  let fixture: ComponentFixture<EndpointCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EndpointCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EndpointCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
