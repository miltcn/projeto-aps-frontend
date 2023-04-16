import { Component, OnInit, ViewChild } from '@angular/core';
import { ServiceOrder } from 'src/app/models/serviceOrder';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-service-order-list',
  templateUrl: './service-order-list.component.html',
  styleUrls: ['./service-order-list.component.css'],
})
export class ServiceOrderListComponent implements OnInit {
  ELEMENT_DATA: ServiceOrder[] = [
    {
      id: '1',
      openingDate: '15/04/2023',
      closingDate: '16/04/2023',
      priority: 'ALTA',
      status: 'ANDAMENTO',
      title: 'Chamado 1',
      comments: 'Chamado teste',
      technician: '1',
      client: '2',
      clientName: 'Roberta',
      technicianName: 'Milton',
    },
  ];

  displayedColumns: string[] = [
    'id',
    'title',
    'clientName',
    'technicianName',
    'openingDate',
    'priority',
    'status',
    'actions',
  ];

  dataSource = new MatTableDataSource<ServiceOrder>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor() {}

  ngOnInit(): void {}

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
