export interface ServiceOrder {
  id?: string;
  openingDate?: string;
  closingDate?: string;
  priority: string;
  status: string;
  title: string;
  comments: string;
  technician: string;
  client: string;
  clientName: string;
  technicianName: string;
}
