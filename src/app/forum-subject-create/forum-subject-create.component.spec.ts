import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumSubjectCreateComponent } from './forum-subject-create.component';

describe('HomeComponent', () => {
  let component: ForumSubjectCreateComponent;
  let fixture: ComponentFixture<ForumSubjectCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForumSubjectCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForumSubjectCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
