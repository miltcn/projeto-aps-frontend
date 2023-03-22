import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../config/api.config';
import { Credentials } from '../models/credentials';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  jwtHelperService: JwtHelperService = new JwtHelperService();

  constructor(private httpClient: HttpClient) {}

  authenticate(credentials: Credentials): Observable<HttpResponse<string>> {
    return this.httpClient.post(`${API_CONFIG.baseUrl}/login`, credentials, {
      observe: 'response',
      responseType: 'text',
    });
  }

  loginSuccessfully(authToken: string): void {
    localStorage.setItem('token', authToken);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    if (token != null) {
      return !this.jwtHelperService.isTokenExpired(token);
    }
    return false;
  }

  logout(): void {
    localStorage.clear();
  }
}
