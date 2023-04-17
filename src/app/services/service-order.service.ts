import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { ServiceOrder } from '../models/serviceOrder';

@Injectable({
  providedIn: 'root',
})
export class ServiceOrderService {
  constructor(private httpClient: HttpClient) {}

  findAll(): Observable<ServiceOrder[]> {
    return this.httpClient.get<ServiceOrder[]>(
      `${API_CONFIG.baseUrl}/chamados`,
    );
  }
}
