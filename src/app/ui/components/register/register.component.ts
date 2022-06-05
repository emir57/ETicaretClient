import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form!: FormGroup;
  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({
      firstLastName: ["", [Validators.required]],
      username: ["", , [Validators.required]],
      email: ["", [Validators.required]],
      password: ["", [Validators.required]],
      rePassword: ["", [Validators.required]]
    })
  }

  onSubmit(value: FormGroup) {

  }

}
