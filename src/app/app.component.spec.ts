import { TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Location } from "@angular/common";
import { RouterTestingModule } from "@angular/router/testing";
import { Router,Routes } from "@angular/router";
import { Component } from '@angular/core';
@Component({
  template: `Home`
})
export class HomeComponent {
}
@Component({
  template: `login`
})
export class LoginSigupComponent {
}
@Component({
  template: `<router-outlet></router-outlet>`
})
class AppRoutingModule{}
export const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginSigupComponent}
];
describe('AppComponent', () => {
  let location: Location;
  let router: Router;
  let fixture;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes)],
      declarations: [
        AppComponent,
        AppRoutingModule,
        LoginSigupComponent,
        HomeComponent
      ],
    }).compileComponents();
    router = TestBed.get(Router);
    location = TestBed.get(Location);

    fixture = TestBed.createComponent(AppRoutingModule);
    router.initialNavigation();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('app');
  }));

  it('navigate to "" redirects you to /login', fakeAsync(() => {
    router.navigate(['']);
    tick(50);
    expect(location.path()).toBe('/login');
}));

it('navigate to "" redirects you to /home', fakeAsync(() => {
    router.navigate(['/home']);
    tick(50);
    expect(location.path()).toBe('/home');
}));
});
