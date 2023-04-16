import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Client } from './../../../models/client';
import { ClientService } from './../../../services/client.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-client-delete',
  templateUrl: './client-delete.component.html',
  styleUrls: ['./client-delete.component.css'],
})
export class ClientDeleteComponent implements OnInit {
  client: Client = {
    id: '',
    name: '',
    cpf: '',
    email: '',
    password: '',
    profiles: [],
  };

  constructor(
    private clientService: ClientService,
    private toastrService: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.client.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.getClient();
  }

  getClient(): void {
    this.clientService.findById(this.client.id).subscribe(response => {
      this.client = response;
      const profiles: string[] = this.client.profiles;

      profiles.forEach((profile, index) => {
        if (profile === 'ADMIN') {
          this.client.profiles[index] = '0';
        } else if (profile === 'CLIENT') {
          this.client.profiles[index] = '1';
        } else if (profile === 'TECHNICIAN') {
          this.client.profiles[index] = '2';
        }
      });
    });
  }

  delete(): void {
    this.clientService.delete(this.client.id).subscribe(
      () => {
        this.toastrService.success('Cliente deletado com sucesso!', 'Delete');
        this.router.navigate(['clientes']);
      },
      err => {
        console.log(err);
        if (err.error.errors) {
          err.error.errors.forEach(element => {
            this.toastrService.error(element.message);
          });
        } else {
          this.toastrService.error(err.error.message);
        }
      },
    );
  }
}
