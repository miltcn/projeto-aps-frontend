import { FormControl, Validators } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'app-technician-create',
  templateUrl: './technician-create.component.html',
  styleUrls: ['./technician-create.component.css'],
})
export class TechnicianCreateComponent {

  name: FormControl = new FormControl(null, Validators.minLength(3));
  cpf: FormControl = new FormControl(null, Validators.required);
  email: FormControl = new FormControl(null, Validators.email);
  password: FormControl = new FormControl(null, Validators.minLength(3));

  constructor() { }
  
  validateFields(): boolean {
    return this.name.valid &&
            this.cpf.valid &&
            this.email.valid &&
            this.password.valid;
  }
}
