export interface ServiceOrder {
  id?: string;
  openingDate?: string;
  closingDate?: string;
  priorityCode: number;
  statusCode: number;
  title: string;
  comments: string;
  technician: string;
  client: string;
  clientName: string;
  technicianName: string;
}
