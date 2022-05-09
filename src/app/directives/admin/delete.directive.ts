import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { HttpClientService } from 'src/app/services/common/http-client.service';
import { ProductService } from 'src/app/services/common/models/product.service';
declare var $: any;

@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective {

  @Input() id: string = "";
  @Input() controller: string = "";
  @Output() callBack: EventEmitter<any> = new EventEmitter<any>();
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
  @HostListener("click")
  async onClick() {
    const i: HTMLTableCellElement = this.element.nativeElement;
    this.httpClientService.delete({
      controller: this.controller,
      action: "delete"
    }, this.id).subscribe(data => {
      $(i.parentElement).animate({
        opacity: 0,
        left: "+=50",
        height: "toogle"
      }, 700, () => {
        this.callBack.emit();
      })
    });

  }

}
