import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Client } from './../../../models/client';
import { ClientService } from './../../../services/client.service';
import { FormControl, Validators } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'app-client-create',
  templateUrl: './client-create.component.html',
  styleUrls: ['./client-create.component.css'],
})
export class ClientCreateComponent {
  client: Client = {
    id: '',
    name: '',
    cpf: '',
    email: '',
    password: '',
    profiles: [],
  };

  name: FormControl = new FormControl(null, Validators.minLength(3));
  cpf: FormControl = new FormControl(null, Validators.required);
  email: FormControl = new FormControl(null, Validators.email);
  password: FormControl = new FormControl(null, Validators.minLength(3));

  constructor(
    private clientService: ClientService,
    private toastrService: ToastrService,
    private router: Router,
  ) {}

  validateFields(): boolean {
    return (
      this.name.valid &&
      this.cpf.valid &&
      this.email.valid &&
      this.password.valid
    );
  }

  create(): void {
    this.clientService.create(this.client).subscribe(
      () => {
        this.toastrService.success(
          'Cliente cadastrado com sucesso!',
          'Cadastro',
        );
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

  addProfile(profile: string): void {
    if (this.client.profiles.includes(profile)) {
      this.client.profiles.splice(this.client.profiles.indexOf(profile), 1);
    } else {
      this.client.profiles.push(profile);
    }
  }
}
