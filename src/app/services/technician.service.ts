import { Observable } from 'rxjs';
import { API_CONFIG } from './../config/api.config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Technician } from '../models/technician';

@Injectable({
  providedIn: 'root'
})
export class TechnicianService {

  constructor(private httpClient: HttpClient) { }

  findAll(): Observable<Technician[]> {
    return this.httpClient.get<Technician[]>(`${API_CONFIG.baseUrl}/tecnicos`);
  }
}
