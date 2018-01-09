import {Directive, ElementRef, AfterViewInit, Output, EventEmitter, Input} from '@angular/core';

@Directive({
    selector: '[aplp-hammer]'
})
export class HammerDirective implements AfterViewInit {

    @Output() onGesture = new EventEmitter();
    @Input() id;

    constructor(private el: ElementRef) {
    }

    ngAfterViewInit() {
            let mc = new Hammer.Manager(this.el.nativeElement);
            mc.add( new Hammer.Tap({ event: 'doubletap', taps: 2 }) );

            mc.on("doubletap", (ev) => {
                this.onGesture.emit(this.id);
            });
    }
}
