import { Directive, OnInit, ElementRef } from '@angular/core';

import { FormSelect } from 'materialize-css';

@Directive({
  selector: '[tzSelect]',
  exportAs: 'selectDirective'
})
export class SelectDirective implements OnInit {
  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.initFormSelect();
  }

  initFormSelect(): void {
    FormSelect.init(this.elementRef.nativeElement);
  }
}
