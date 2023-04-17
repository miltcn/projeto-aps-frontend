import { Component, OnInit, ViewChild } from '@angular/core';
import { ServiceOrder } from 'src/app/models/serviceOrder';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ServiceOrderService } from 'src/app/services/service-order.service';

@Component({
  selector: 'app-service-order-list',
  templateUrl: './service-order-list.component.html',
  styleUrls: ['./service-order-list.component.css'],
})
export class ServiceOrderListComponent implements OnInit {
  ELEMENT_DATA: ServiceOrder[] = [];
  FILTERED_DATA: ServiceOrder[] = [];

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

  constructor(private serviceOrderService: ServiceOrderService) {}

  ngOnInit(): void {
    this.findAll();
  }

  findAll(): void {
    this.serviceOrderService.findAll().subscribe(response => {
      console.log(response);
      this.ELEMENT_DATA = response;
      this.dataSource = new MatTableDataSource<ServiceOrder>(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getStatus(status: number) {
    if (status === 0) {
      return 'ABERTO';
    } else if (status === 1) {
      return 'ANDAMENTO';
    } else {
      return 'ENCERRADO';
    }
  }

  getPriority(priority: number) {
    if (priority === 0) {
      return 'BAIXA';
    } else if (priority === 1) {
      return 'MÉDIA';
    } else {
      return 'ALTA';
    }
  }

  filterByStatus(status: number): void {
    const serviceOrderList: ServiceOrder[] = [];
    this.ELEMENT_DATA.forEach(element => {
      if (element.statusCode === status) serviceOrderList.push(element);
    });
    this.FILTERED_DATA = serviceOrderList;
    this.dataSource = new MatTableDataSource<ServiceOrder>(serviceOrderList);
    this.dataSource.paginator = this.paginator;
  }
}
