import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SelectDirective } from './select.directive';

@NgModule({
  declarations: [SelectDirective],
  imports: [CommonModule],
  exports: [SelectDirective]
})
export class SelectModule {}
