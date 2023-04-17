import { ServiceOrder } from './../../../models/serviceOrder';
import { ServiceOrderService } from 'src/app/services/service-order.service';
import { TechnicianService } from './../../../services/technician.service';
import { ClientService } from './../../../services/client.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Client } from 'src/app/models/client';
import { Technician } from 'src/app/models/technician';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-service-order-update',
  templateUrl: './service-order-update.component.html',
  styleUrls: ['./service-order-update.component.css'],
})
export class ServiceOrderUpdateComponent implements OnInit {
  serviceOrder: ServiceOrder = {
    title: '',
    statusCode: undefined,
    priorityCode: undefined,
    comments: '',
    technicianId: '',
    clientId: '',
  };

  clients: Client[] = [];
  technicians: Technician[] = [];

  title: FormControl = new FormControl(null, [Validators.required]);
  status: FormControl = new FormControl(null, [Validators.required]);
  priority: FormControl = new FormControl(null, [Validators.required]);
  technician: FormControl = new FormControl(null, [Validators.required]);
  client: FormControl = new FormControl(null, [Validators.required]);
  comments: FormControl = new FormControl(null, [Validators.required]);

  constructor(
    private serviceOrderService: ServiceOrderService,
    private clientService: ClientService,
    private technicianService: TechnicianService,
    private toastrService: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.serviceOrder.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.getServiceOrder();
    this.findAllClients();
    this.findAllTechnicians();
  }

  findAllClients() {
    this.clientService.findAll().subscribe(response => {
      this.clients = response;
    });
  }

  findAllTechnicians() {
    this.technicianService.findAll().subscribe(response => {
      this.technicians = response;
    });
  }

  validateFields(): boolean {
    return (
      this.title.valid &&
      this.status.valid &&
      this.priority.valid &&
      this.technician.valid &&
      this.client.valid &&
      this.comments.valid
    );
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

  update(): void {
    console.log(this.serviceOrder);
    this.serviceOrderService.update(this.serviceOrder).subscribe(
      () => {
        this.toastrService.success(
          'Chamado atualizado com sucesso!',
          'Atualizar Chamado',
        );
        this.router.navigate(['chamados']);
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
