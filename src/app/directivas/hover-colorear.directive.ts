import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[hoverColorear]'
})
export class HoverColorearDirective {

  constructor(private el: ElementRef) {}

  @HostListener("mouseenter") onMouseEnter() {
    this.el.nativeElement.style.backgroundColor = 'rgb(5, 5, 99)';
    this.el.nativeElement.style.cursor = 'pointer';
    this.el.nativeElement.style.color = 'white';
    
  }

  @HostListener("mouseleave") onMouseLeave() {
    this.el.nativeElement.style.backgroundColor = 'transparent';
    this.el.nativeElement.style.color = 'black';
  }
}