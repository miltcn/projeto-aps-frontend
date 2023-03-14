import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Credentials } from 'src/app/models/credentials';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  credentials: Credentials = {
    email: '',
    password: ''
  }

  email = new FormControl(null, Validators.email);
  password = new FormControl(null, Validators.minLength(3));

  constructor(
    private toastr: ToastrService,
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  login() {
    this.authenticationService.authenticate(this.credentials).subscribe(
      response => { 
        this.authenticationService.loginSuccessfully(response.headers.get('Authorization').substring(7));
        this.router.navigate(['']);
      }, () => {
        this.toastr.error('Usuário e/ou senha inválidos!');
      }
    );
  }

  validateFields(): boolean {
    if (this.email.valid && this.password.valid) {
      return true;
    }
    return false;
  }

}
