import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { LoginComponent } from './components/login/login.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { AuthGuard } from './shared/guards/auth.guard';


const routes: Routes = [
    {      
      path: '', component: MainLayoutComponent, children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: '', component: HomePageComponent, canActivate: [AuthGuard] }
    ]   
  },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
