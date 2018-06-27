import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginSigupComponent } from './login-sigup.component';

const routes: Routes = [{
    path: '', component: LoginSigupComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginSigupRoutingModule { }
