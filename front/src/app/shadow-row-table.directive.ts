import { Directive, ElementRef, Renderer, HostListener } from '@angular/core';

@Directive({
  selector: '[aplp-shadow-row-table]'
})
export class ShadowRowTableDirective {
    constructor(private el: ElementRef, private renderer: Renderer) {
        this.setBack('white');
    }

    @HostListener('mouseenter') onMouseEnter() {
        this.setBack('#eeeeea');
    }

    @HostListener('mouseleave') onMouseLeave() {
        this.setBack('white');
    }

    private setBack(color: string) {
        this.renderer.setElementStyle(this.el.nativeElement, 'background-color', color);
    }
}