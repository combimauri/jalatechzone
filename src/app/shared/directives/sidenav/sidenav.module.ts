import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SidenavDirective } from './sidenav.directive';

@NgModule({
  declarations: [SidenavDirective],
  imports: [CommonModule],
  exports: [SidenavDirective]
})
export class SidenavModule {}
