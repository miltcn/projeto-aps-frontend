import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Technician } from './../../../models/technician';
import { TechnicianService } from './../../../services/technician.service';
import { FormControl, Validators } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'app-technician-create',
  templateUrl: './technician-create.component.html',
  styleUrls: ['./technician-create.component.css'],
})
export class TechnicianCreateComponent {
  technician: Technician = {
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
    private technicianService: TechnicianService,
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
    this.technicianService.create(this.technician).subscribe(
      () => {
        this.toastrService.success(
          'Técnico cadastrado com sucesso!',
          'Cadastro',
        );
        this.router.navigate(['tecnicos']);
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
    if (this.technician.profiles.includes(profile)) {
      this.technician.profiles.splice(
        this.technician.profiles.indexOf(profile),
        1,
      );
    } else {
      this.technician.profiles.push(profile);
    }
  }
}
