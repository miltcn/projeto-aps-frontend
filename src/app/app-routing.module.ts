import { TechnicianCreateComponent } from './components/technician/technician-create/technician-create.component';
import { AuthenticationGuard } from './authentication/authentication.guard';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TechnicianListComponent } from './components/technician/technician-list/technician-list.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: NavigationComponent, canActivate: [AuthenticationGuard], children: [
      { path: 'home', component: HomeComponent },
      { path: 'tecnicos', component: TechnicianListComponent },
      { path: 'tecnicos/create', component: TechnicianCreateComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
