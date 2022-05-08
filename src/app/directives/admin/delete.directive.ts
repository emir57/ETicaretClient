import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';
import { ProductService } from 'src/app/services/common/models/product.service';
declare var $: any;

@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective {

  @Input() id: string = "";
  constructor(
    private element: ElementRef,
    private _renderer: Renderer2,
    private productService: ProductService
  ) {
    const i: HTMLElement = _renderer.createElement("i");
    i.setAttribute("class", "bi bi-trash3 text-danger");
    i.setAttribute("style", "cursor:pointer;float:right;");
    _renderer.appendChild(element.nativeElement, i);
  }
  @HostListener("click")
  async onClick() {
    const i: HTMLTableCellElement = this.element.nativeElement;
    this.productService.delete(this.id).subscribe();
    $(i.parentElement).fadeOut(2000);
  }

}
