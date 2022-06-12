import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { UserService } from 'src/app/services/common/models/user.service';
import { ToastrPosition } from 'src/app/services/ui/custom-toastr.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends BaseComponent implements OnInit {

  loginForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    public spinner: NgxSpinnerService,
    private toastrServicE: ToastrService
  ) {
    super(spinner);
  }

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      usernameOrEmail: ["", [
        Validators.required,
        Validators.maxLength(50), Validators.minLength(3)]],
      password: ["", [
        Validators.required,
        Validators.minLength(6)]]
    })
  }

  async onSubmit(value: any) {
    this.spinner.show(SpinnerType.BallPulseAsync);
    const response = await this.userService.login(value, () => {
      this.spinner.hide();
    });
    if (response.succeded) {
      this.toastrServicE.success(response.message, "Başarılı", {
        positionClass: ToastrPosition.TopRight
      })
    } else {
      this.toastrServicE.error(response.message, "Başarısız", {
        positionClass: ToastrPosition.TopRight
      })
    }
  }

  get password() {
    return this.loginForm.get("password");
  }
  get usernameOrEmail() {
    return this.loginForm.get("usernameOrEmail");
  }

}
