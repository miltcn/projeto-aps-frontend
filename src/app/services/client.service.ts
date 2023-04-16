import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client } from '../models/client';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  constructor(private httpClient: HttpClient) {}

  findById(id: string): Observable<Client> {
    return this.httpClient.get<Client>(`${API_CONFIG.baseUrl}/clientes/${id}`);
  }

  findAll(): Observable<Client[]> {
    return this.httpClient.get<Client[]>(`${API_CONFIG.baseUrl}/clientes`);
  }

  create(client: Client): Observable<Client> {
    return this.httpClient.post<Client>(
      `${API_CONFIG.baseUrl}/clientes`,
      client,
    );
  }

  update(client: Client): Observable<Client> {
    return this.httpClient.put<Client>(
      `${API_CONFIG.baseUrl}/clientes/${client.id}`,
      client,
    );
  }

  delete(id: string): Observable<Client> {
    return this.httpClient.delete<Client>(
      `${API_CONFIG.baseUrl}/clientes/${id}`,
    );
  }
}
