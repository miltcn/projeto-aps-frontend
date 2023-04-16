import { Technician } from './../models/technician';
import { Observable } from 'rxjs';
import { API_CONFIG } from './../config/api.config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TechnicianService {
  constructor(private httpClient: HttpClient) {}

  findById(id: string): Observable<Technician> {
    return this.httpClient.get<Technician>(
      `${API_CONFIG.baseUrl}/tecnicos/${id}`,
    );
  }

  findAll(): Observable<Technician[]> {
    return this.httpClient.get<Technician[]>(`${API_CONFIG.baseUrl}/tecnicos`);
  }

  create(technician: Technician): Observable<Technician> {
    return this.httpClient.post<Technician>(
      `${API_CONFIG.baseUrl}/tecnicos`,
      technician,
    );
  }

  update(technician: Technician): Observable<Technician> {
    return this.httpClient.put<Technician>(
      `${API_CONFIG.baseUrl}/tecnicos/${technician.id}`,
      technician,
    );
  }

  delete(id: string): Observable<Technician> {
    return this.httpClient.delete<Technician>(
      `${API_CONFIG.baseUrl}/tecnicos/${id}`,
    );
  }
}
