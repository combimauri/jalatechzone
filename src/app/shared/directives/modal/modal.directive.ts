import {
  Directive,
  OnInit,
  ElementRef,
  Output,
  EventEmitter
} from '@angular/core';

import { Modal } from 'materialize-css';

@Directive({
  selector: '[tzModal]'
})
export class ModalDirective implements OnInit {
  @Output() private modalClose = new EventEmitter();

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    Modal.init(this.elementRef.nativeElement, {
      onCloseEnd: () => {
        this.modalClose.emit();
      }
    });
  }
}
