import { HomeComponent } from './components/home/home.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TechnicianListComponent } from './components/technician/technician-list/technician-list.component';

const routes: Routes = [
  {
    path: '',
    component: NavigationComponent, children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'tecnicos',
        component: TechnicianListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
