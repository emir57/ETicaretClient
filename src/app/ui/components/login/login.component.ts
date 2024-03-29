import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { Token } from 'src/app/contracts/token/token';
import { AuthService } from 'src/app/services/common/auth.service';
import { HttpClientService } from 'src/app/services/common/http-client.service';
import { UserService } from 'src/app/services/common/models/user.service';
import { ToastrPosition } from 'src/app/services/ui/custom-toastr.service';
import { FacebookLoginProvider } from "@abacritt/angularx-social-login";
import { UserAuthService } from 'src/app/services/common/models/user-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends BaseComponent implements OnInit {

  loginForm!: UntypedFormGroup;
  constructor(
    private formBuilder: UntypedFormBuilder,
    private userService: UserService,
    public spinner: NgxSpinnerService,
    private toastrService: ToastrService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private socialAuthService: SocialAuthService,
    private userAuthService: UserAuthService
  ) {
    super(spinner);
    this.socialAuthService.authState.subscribe(async (user: SocialUser) => {
      this.showSpinner(SpinnerType.BallAtom);
      console.log(user);
      switch (user.provider) {
        case "GOOGLE":
          await this.userAuthService.googleLogin(user, () => this.hideSpinner(SpinnerType.BallAtom));
          break;
        case "FACEBOOK":
          await this.userAuthService.facebookLogin(user, () => this.hideSpinner(SpinnerType.BallAtom));
          break;
      }
    })
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

  signInWithFB() {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  async onSubmit(value: any) {
    this.spinner.show(SpinnerType.BallPulseAsync);
    const response = await this.userAuthService.login(value, () => {
      this.spinner.hide(SpinnerType.BallPulseAsync);
    });
    if (response.succeeded) {
      this.authService.identityCheck();
      this.toastrService.success(response.message, "Başarılı", {
        positionClass: ToastrPosition.TopRight
      })
      this.activatedRoute.queryParams.subscribe(param => {
        const returnUrl = param["returnUrl"];
        if (returnUrl) {
          this.router.navigate([returnUrl]);
        }
      })
    } else {
      this.toastrService.error(response.message, "Başarısız", {
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
