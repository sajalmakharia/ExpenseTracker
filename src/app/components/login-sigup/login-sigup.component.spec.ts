import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginSigupComponent } from './login-sigup.component';

describe('LoginSigupComponent', () => {
  let component: LoginSigupComponent;
  let fixture: ComponentFixture<LoginSigupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginSigupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginSigupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
