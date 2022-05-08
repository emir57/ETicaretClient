import { Directive, ElementRef, Renderer2 } from '@angular/core';
import { HttpClientService } from 'src/app/services/common/http-client.service';

@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective {

  constructor(
    private element: ElementRef,
    private _renderer: Renderer2,
    private httpClientService: HttpClientService
  ) {
    const i: HTMLElement = _renderer.createElement("i");
    i.setAttribute("class", "bi bi-trash3 text-danger");
    i.setAttribute("style", "cursor:pointer;float:right;");
    _renderer.appendChild(element.nativeElement, i);
  }

}
