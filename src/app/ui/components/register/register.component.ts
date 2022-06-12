import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from 'src/app/base/base.component';
import { Create_User } from 'src/app/contracts/users/create_user';
import { User } from 'src/app/entities/user';
import { UserService } from 'src/app/services/common/models/user.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent extends BaseComponent implements OnInit {

  registerForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private customToastrService: CustomToastrService,
    public spinner: NgxSpinnerService
  ) {
    super(spinner);
  }

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

  async onSubmit(value: User) {
    if (!this.registerForm.valid)
      return;
    const result: Create_User = await this.userService.create(value);
    if (result.succeeded) {
      this.customToastrService.message(result.message, "Kullanıcı kaydı başarılı", {
        messageType: ToastrMessageType.Success,
        position: ToastrPosition.TopRight
      })
    } else {
      this.customToastrService.message(result.message, "Hata", {
        messageType: ToastrMessageType.Error,
        position: ToastrPosition.TopRight
      })
    }
  }

  checkPassword: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    return group.get("password")?.value === group.get("rePassword")?.value ?
      null :
      { notSame: true };
  }

}
