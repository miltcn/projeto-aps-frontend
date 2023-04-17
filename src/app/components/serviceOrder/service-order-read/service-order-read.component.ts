import { ServiceOrder } from './../../../models/serviceOrder';
import { ServiceOrderService } from 'src/app/services/service-order.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Client } from 'src/app/models/client';
import { Technician } from 'src/app/models/technician';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-service-order-read',
  templateUrl: './service-order-read.component.html',
  styleUrls: ['./service-order-read.component.css'],
})
export class ServiceOrderReadComponent implements OnInit {
  serviceOrder: ServiceOrder = {
    title: '',
    statusCode: undefined,
    priorityCode: undefined,
    comments: '',
    technicianId: '',
    clientId: '',
  };

  constructor(
    private serviceOrderService: ServiceOrderService,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.serviceOrder.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.getServiceOrder();
  }

  getServiceOrder() {
    this.serviceOrderService.findById(this.serviceOrder.id).subscribe(
      response => {
        this.serviceOrder = response;
      },
      err => {
        this.toastrService.error(err.error.error);
      },
    );
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
}
