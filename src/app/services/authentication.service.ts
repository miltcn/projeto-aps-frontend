import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../config/api.config';
import { Credentials } from '../models/credentials';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  jwtHelperService: JwtHelperService = new JwtHelperService();

  constructor(private httpClient: HttpClient) { }

  authenticate(credentials: Credentials) {
    return this.httpClient.post(`${API_CONFIG.baseUrl}/login`, credentials, {
      observe: 'response',
      responseType: 'text'
    });
  }

  loginSuccessfully(authToken: string) {
    localStorage.setItem('token', authToken);
  }

  isAuthenticated() {
    let token = localStorage.getItem('token');
    if(token != null) {
      return !this.jwtHelperService.isTokenExpired(token);
    }
    return false;
  }
}
