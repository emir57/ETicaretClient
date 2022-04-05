import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './services/ui/custom-toastr.service';
declare var $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ETicaretClient';
  constructor(private customToastrService: CustomToastrService,private ngxSpinnerService:NgxSpinnerService) {
    this.ngxSpinnerService.show();
    setTimeout(() => {
      this.ngxSpinnerService.hide();
    }, 2000);
  }
}
