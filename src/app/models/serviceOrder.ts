export interface ServiceOrder {
  id?: string;
  openingDate?: string;
  closingDate?: string;
  priorityCode: number;
  statusCode: number;
  title: string;
  comments: string;
  technicianId: string;
  clientId: string;
  clientName?: string;
  technicianName?: string;
}
