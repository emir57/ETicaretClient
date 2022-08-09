import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { CustomToastrService, ToastrMessageType } from '../ui/custom-toastr.service';
import { UserAuthService } from './models/user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorHandlerInterceptorService implements HttpInterceptor {

  constructor(
    private toastrService: CustomToastrService,
    private userAuthService: UserAuthService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError(error => {
      switch (error.status) {
        case HttpStatusCode.Unauthorized:
          this.toastrService.message("Yetkisiz işlem", "Hata", {
            messageType: ToastrMessageType.Warning
          });
          this.userAuthService.refreshTokenLogin(localStorage.getItem("refreshToken") as string).then(data => {

          });
          break;
        case HttpStatusCode.InternalServerError:
          this.toastrService.message("Sunucu hatası", "Hata", {
            messageType: ToastrMessageType.Error
          });
          break;
        case HttpStatusCode.BadRequest:
          this.toastrService.message("Geçersiz istek yapıldı", "Hata", {
            messageType: ToastrMessageType.Error
          });
          break;
        case HttpStatusCode.NotFound:
          this.toastrService.message("Sayfa bulunamadı", "Hata", {
            messageType: ToastrMessageType.Error
          });
          break;
        default:
          this.toastrService.message("Bilinmeyen bir hata", "Hata", {
            messageType: ToastrMessageType.Error
          });
          break;
      }
      console.log(error);
      return of(error);
    }))
  }

}
