import { TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { Router,RouterModule } from "@angular/router";
import { AuthGuardService } from './auth-guard.service';

describe('AuthGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ RouterModule],
      providers: [AuthGuardService, Router]
    });
  });

  it('should be created', inject([AuthGuardService], (service: AuthGuardService) => {
    expect(service).toBeTruthy();
  }));
});
