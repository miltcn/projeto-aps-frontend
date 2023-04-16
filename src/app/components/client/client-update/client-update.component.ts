import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Client } from './../../../models/client';
import { ClientService } from './../../../services/client.service';
import { FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-client-update',
  templateUrl: './client-update.component.html',
  styleUrls: ['./client-update.component.css'],
})
export class ClientUpdateComponent implements OnInit {
  client: Client = {
    id: '',
    name: '',
    cpf: '',
    email: '',
    password: '',
    profiles: [],
  };

  isAdmin: boolean;
  isClient: boolean;
  isTechnician: boolean;

  name: FormControl = new FormControl(null, Validators.minLength(3));
  cpf: FormControl = new FormControl(null, Validators.required);
  email: FormControl = new FormControl(null, Validators.email);
  password: FormControl = new FormControl(null, Validators.minLength(3));

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

  validateFields(): boolean {
    return (
      this.name.valid &&
      this.cpf.valid &&
      this.email.valid &&
      this.password.valid
    );
  }

  getClient(): void {
    this.clientService.findById(this.client.id).subscribe(response => {
      this.client = response;
      const profiles: string[] = this.client.profiles;

      profiles.forEach((profile, index) => {
        if (profile === 'ADMIN') {
          this.client.profiles[index] = '0';
          this.isAdmin = true;
        } else if (profile === 'CLIENT') {
          this.client.profiles[index] = '1';
          this.isClient = true;
        } else if (profile === 'TECHNICIAN') {
          this.client.profiles[index] = '2';
          this.isClient = true;
        }
      });
    });
  }

  update(): void {
    this.clientService.update(this.client).subscribe(
      () => {
        this.toastrService.success('Cliente atualizado com sucesso!', 'Update');
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
    console.log('addProfile: ' + profile);

    if (this.client.profiles.includes(profile)) {
      this.client.profiles.splice(this.client.profiles.indexOf(profile), 1);
    } else {
      this.client.profiles.push(profile);
    }
  }
}
