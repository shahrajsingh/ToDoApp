import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AppcontainerComponent } from './appcontainer/appcontainer.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: "signup", component: SignupComponent },
  { path: "app", component: AppcontainerComponent,canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
