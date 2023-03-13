import { Technician } from './../../../models/technician';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-technician-list',
  templateUrl: './technician-list.component.html',
  styleUrls: ['./technician-list.component.css']
})
export class TechnicianListComponent implements OnInit {

  ELEMENT_DATA: Technician[] = [
    {id: 1,fullName: 'Thomas Danilo José da Luz',cpf: '165.767.961-61',email: 'tecnico@email.com',password: '123',profiles: ['0'],createAt: '2023-03-13'},
    {id: 1,fullName: 'Thomas Danilo José da Luz',cpf: '165.767.961-61',email: 'tecnico@email.com',password: '123',profiles: ['0'],createAt: '2023-03-13'},
    {id: 1,fullName: 'Thomas Danilo José da Luz',cpf: '165.767.961-61',email: 'tecnico@email.com',password: '123',profiles: ['0'],createAt: '2023-03-13'},
    {id: 1,fullName: 'Thomas Danilo José da Luz',cpf: '165.767.961-61',email: 'tecnico@email.com',password: '123',profiles: ['0'],createAt: '2023-03-13'},
    {id: 1,fullName: 'Thomas Danilo José da Luz',cpf: '165.767.961-61',email: 'tecnico@email.com',password: '123',profiles: ['0'],createAt: '2023-03-13'},
    {id: 1,fullName: 'Thomas Danilo José da Luz',cpf: '165.767.961-61',email: 'tecnico@email.com',password: '123',profiles: ['0'],createAt: '2023-03-13'},
    {id: 1,fullName: 'Thomas Danilo José da Luz',cpf: '165.767.961-61',email: 'tecnico@email.com',password: '123',profiles: ['0'],createAt: '2023-03-13'},
  ]
  
  displayedColumns: string[] = ['id', 'name', 'cpf', 'email', 'actions'];
  dataSource = new MatTableDataSource<Technician>(this.ELEMENT_DATA);

  constructor() { }

  ngOnInit(): void {
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

}
