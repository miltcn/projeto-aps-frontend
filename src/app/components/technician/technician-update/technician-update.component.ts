import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Technician } from './../../../models/technician';
import { TechnicianService } from './../../../services/technician.service';
import { FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-technician-update',
  templateUrl: './technician-update.component.html',
  styleUrls: ['./technician-update.component.css'],
})
export class TechnicianUpdateComponent implements OnInit {
  technician: Technician = {
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
    private technicianService: TechnicianService,
    private toastrService: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.technician.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.getTechnician();
  }

  validateFields(): boolean {
    return (
      this.name.valid &&
      this.cpf.valid &&
      this.email.valid &&
      this.password.valid
    );
  }

  getTechnician(): void {
    this.technicianService.findById(this.technician.id).subscribe(response => {
      this.technician = response;
      const profiles: string[] = this.technician.profiles;

      profiles.forEach((profile, index) => {
        if (profile === 'ADMIN') {
          this.technician.profiles[index] = '0';
          this.isAdmin = true;
        } else if (profile === 'CLIENT') {
          this.technician.profiles[index] = '1';
          this.isClient = true;
        } else if (profile === 'TECHNICIAN') {
          this.technician.profiles[index] = '2';
          this.isTechnician = true;
        }
      });
    });
  }

  update(): void {
    this.technicianService.update(this.technician).subscribe(
      () => {
        this.toastrService.success('Técnico atualizado com sucesso!', 'Update');
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
    console.log('addProfile: ' + profile);

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
