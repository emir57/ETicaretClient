import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      username: ["", [
        Validators.required,
        Validators.maxLength(50), Validators.minLength(3)]],
      password: ["", [
        Validators.required,
        Validators.minLength(6)]]
    })
  }

  onSubmit(value: any) {

  }

  get password() {
    return this.loginForm.get("password");
  }
  get username() {
    return this.loginForm.get("username");
  }

}
