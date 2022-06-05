import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.createForm();
    console.log(this.registerForm)
  }

  createForm() {
    this.registerForm = this.formBuilder.group({
      firstLastName: ["", [
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(3)
      ]],
      username: ["", [
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(3)
      ]],
      email: ["", [
        Validators.required,
        Validators.maxLength(100),
        Validators.email
      ]],
      password: ["", [
        Validators.required,
        Validators.minLength(6)
      ]],
      rePassword: ["", [
        Validators.required,
        Validators.minLength(6)
      ]]
    }, { validators: this.checkPassword })
  }
  get firstLastName() {
    return this.registerForm.get("firstLastName");
  }
  get username() {
    return this.registerForm.get("username");
  }
  get email() {
    return this.registerForm.get("email");
  }
  get password() {
    return this.registerForm.get("password");
  }
  get rePassword() {
    return this.registerForm.get("rePassword");
  }

  onSubmit(value: FormGroup) {

  }

  checkPassword: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    return group.get("password")?.value === group.get("rePassword")?.value ?
      null :
      { notSame: true };
  }

}
