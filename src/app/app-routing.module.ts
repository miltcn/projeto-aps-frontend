import { TechnicianCreateComponent } from './components/technician/technician-create/technician-create.component';
import { AuthenticationGuard } from './authentication/authentication.guard';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TechnicianListComponent } from './components/technician/technician-list/technician-list.component';
import { TechnicianUpdateComponent } from './components/technician/technician-update/technician-update.component';
import { TechnicianDeleteComponent } from './components/technician/technician-delete/technician-delete.component';
import { ClientListComponent } from './components/client/client-list/client-list.component';
import { ClientCreateComponent } from './components/client/client-create/client-create.component';
import { ClientUpdateComponent } from './components/client/client-update/client-update.component';
import { ClientDeleteComponent } from './components/client/client-delete/client-delete.component';

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
      { path: 'tecnicos/delete/:id', component: TechnicianDeleteComponent },

      { path: 'clientes', component: ClientListComponent },
      { path: 'clientes/create', component: ClientCreateComponent },
      { path: 'clientes/update/:id', component: ClientUpdateComponent },
      { path: 'clientes/delete/:id', component: ClientDeleteComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
