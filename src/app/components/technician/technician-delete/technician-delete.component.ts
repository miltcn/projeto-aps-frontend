import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Technician } from './../../../models/technician';
import { TechnicianService } from './../../../services/technician.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-technician-delete',
  templateUrl: './technician-delete.component.html',
  styleUrls: ['./technician-delete.component.css'],
})
export class TechnicianDeleteComponent implements OnInit {
  technician: Technician = {
    id: '',
    name: '',
    cpf: '',
    email: '',
    password: '',
    profiles: [],
  };

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

  getTechnician(): void {
    this.technicianService.findById(this.technician.id).subscribe(response => {
      this.technician = response;
      const profiles: string[] = this.technician.profiles;

      profiles.forEach((profile, index) => {
        if (profile === 'ADMIN') {
          this.technician.profiles[index] = '0';
        } else if (profile === 'CLIENT') {
          this.technician.profiles[index] = '1';
        } else if (profile === 'TECHNICIAN') {
          this.technician.profiles[index] = '2';
        }
      });
    });
  }

  delete(): void {
    this.technicianService.delete(this.technician.id).subscribe(
      () => {
        this.toastrService.success('Técnico deletado com sucesso!', 'Delete');
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
}
