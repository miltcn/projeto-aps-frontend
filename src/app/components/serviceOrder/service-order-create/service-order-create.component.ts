import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-service-order-create',
  templateUrl: './service-order-create.component.html',
  styleUrls: ['./service-order-create.component.css'],
})
export class ServiceOrderCreateComponent implements OnInit {
  title: FormControl = new FormControl(null, [Validators.required]);
  status: FormControl = new FormControl(null, [Validators.required]);
  priority: FormControl = new FormControl(null, [Validators.required]);
  technician: FormControl = new FormControl(null, [Validators.required]);
  client: FormControl = new FormControl(null, [Validators.required]);
  comments: FormControl = new FormControl(null, [Validators.required]);

  constructor() {}

  ngOnInit(): void {}

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
}
