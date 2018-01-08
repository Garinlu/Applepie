import {Directive, ElementRef, HostListener, Input, OnInit, Renderer2} from '@angular/core';

@Directive({
    selector: '[aplp-responsive-menu]'
})
export class ResponsiveMenuDirective implements OnInit {
    @Input() namemenu: string;
    isVertical: boolean;

    constructor(private el: ElementRef, private renderer: Renderer2) {

    }

    ngOnInit(): void {
        this.setPlace();
    }

    private setPlace() {
        if (window.innerWidth <= 1565) {
            if (this.namemenu == 'main menu') {
                this.renderer.addClass(this.el.nativeElement, 'top');
            } else if (this.namemenu == 'user menu') {
                this.renderer.addClass(this.el.nativeElement, 'bottom');
            }
            this.isVertical = false;
            this.addGlobalClass(false);
        }
        else {
            if (this.namemenu == 'main menu') {
                this.renderer.addClass(this.el.nativeElement, 'left');
            } else if (this.namemenu == 'user menu') {
                this.renderer.addClass(this.el.nativeElement, 'right');
            }
            this.isVertical = true;
            this.addGlobalClass(true);
        }
    }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        if (window.innerWidth <= 1565 && this.isVertical) {
            this.removeGlobalClass(true);
            if (this.namemenu == 'main menu') {
                this.renderer.removeClass(this.el.nativeElement, 'left');
                this.renderer.addClass(this.el.nativeElement, 'top');
            } else if (this.namemenu == 'user menu') {
                this.renderer.removeClass(this.el.nativeElement, 'right');
                this.renderer.addClass(this.el.nativeElement, 'bottom');
            }
            this.isVertical = false;
            this.addGlobalClass(false);
        }
        else if (window.innerWidth > 1565 && !this.isVertical) {
            this.removeGlobalClass(false);
            if (this.namemenu == 'main menu') {
                this.renderer.removeClass(this.el.nativeElement, 'top');
                this.renderer.addClass(this.el.nativeElement, 'left');
            } else if (this.namemenu == 'user menu') {
                this.renderer.removeClass(this.el.nativeElement, 'bottom');
                this.renderer.addClass(this.el.nativeElement, 'right');
            }
            this.isVertical = true;
            this.addGlobalClass(true);
        }
    }

    addGlobalClass(orientation: boolean) {
        this.renderer.addClass(this.el.nativeElement, 'fixed');
        if (orientation)
            this.renderer.addClass(this.el.nativeElement, 'vertical');
        this.renderer.addClass(this.el.nativeElement, 'menu');
    }

    removeGlobalClass(orientation: boolean) {
        this.renderer.removeClass(this.el.nativeElement, 'fixed');
        if (orientation)
            this.renderer.removeClass(this.el.nativeElement, 'vertical');
        this.renderer.removeClass(this.el.nativeElement, 'menu');
    }

}
