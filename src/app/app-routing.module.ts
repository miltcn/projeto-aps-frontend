import { TechnicianCreateComponent } from './components/technician/technician-create/technician-create.component';
import { AuthenticationGuard } from './authentication/authentication.guard';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TechnicianListComponent } from './components/technician/technician-list/technician-list.component';
import { TechnicianUpdateComponent } from './components/technician/technician-update/technician-update.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: NavigationComponent,
    canActivate: [AuthenticationGuard],
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'tecnicos', component: TechnicianListComponent },
      { path: 'tecnicos/create', component: TechnicianCreateComponent },
      { path: 'tecnicos/update/:id', component: TechnicianUpdateComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
