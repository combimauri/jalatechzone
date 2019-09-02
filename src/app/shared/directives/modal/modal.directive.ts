import {
  Directive,
  OnInit,
  Output,
  ElementRef,
  EventEmitter
} from '@angular/core';

import { Modal } from 'materialize-css';

@Directive({
  selector: '[tzModal]',
  exportAs: 'modalDirective'
})
export class ModalDirective implements OnInit {
  modalInstance: Modal;
  @Output() private modalClose = new EventEmitter();

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.modalInstance = Modal.init(this.elementRef.nativeElement, {
      onCloseEnd: () => {
        this.modalClose.emit();
      }
    });
  }
}
