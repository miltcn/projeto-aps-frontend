import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent implements OnInit {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private toastrService: ToastrService,
  ) {}

  ngOnInit(): void {
    this.router.navigate(['chamados/read/1']);
  }

  logout(): void {
    this.router.navigate(['login']);
    this.authenticationService.logout();
    this.toastrService.info('Logout realizado com sucesso!', 'Logout', {
      timeOut: 3000,
    });
  }
}
