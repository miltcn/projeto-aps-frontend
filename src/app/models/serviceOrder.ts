import { Client } from './client';
import { Technician } from './technician';

export interface ServiceOrder {
  id?: string;
  openingDate?: string;
  closingDate?: string;
  priority: string;
  status: string;
  title: string;
  comments: string;
  technician: Technician;
  client: Client;
  nomeClient: string;
  nomeTechnician: string;
}
