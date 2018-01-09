import {Directive, ElementRef, HostListener, OnInit, Renderer2} from '@angular/core';

@Directive({
    selector: '[aplp-rm-column]'
})
export class RmColumnDirective implements OnInit {

    isHidden: boolean;

    constructor(private el: ElementRef, private renderer: Renderer2) {
    }

    ngOnInit(): void {
        this.setHide();
    }

    private setHide() {
        if (window.innerWidth <= 721) {
            this.renderer.setStyle(this.el.nativeElement, 'display', 'none');
            this.isHidden = true;
        }
        else {
            this.renderer.setStyle(this.el.nativeElement, 'display', '');
            this.isHidden = false;
        }
    }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        if (window.innerWidth <= 721 && !this.isHidden) {
            this.renderer.setStyle(this.el.nativeElement, 'display', 'none');
            this.isHidden = true;
        }
        else if (window.innerWidth > 721 && this.isHidden) {
            this.renderer.setStyle(this.el.nativeElement, 'display', '');
            this.isHidden = false;
        }
    }

}
