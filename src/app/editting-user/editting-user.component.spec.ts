import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdittingUserComponent } from './editting-user.component';

describe('EdittingUserComponent', () => {
  let component: EdittingUserComponent;
  let fixture: ComponentFixture<EdittingUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EdittingUserComponent]
    });
    fixture = TestBed.createComponent(EdittingUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
