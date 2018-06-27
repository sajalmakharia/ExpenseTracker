import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {} from './components/home/home.module'
import { AuthGuardService } from './shared/guard/auth-guard.service';
const routes: Routes = [
     { path: 'login', loadChildren: './components/login-sigup/login-sigup.module#LoginSigupModule' },
     { path: 'home', loadChildren: './components/home/home.module#HomeModule', canActivate:[AuthGuardService]},
     { path: '**', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
