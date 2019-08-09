import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { SidenavModule } from '../shared/directives/sidenav/sidenav.module';

@NgModule({
  declarations: [NavbarComponent, FooterComponent],
  imports: [CommonModule, RouterModule, SidenavModule],
  exports: [NavbarComponent, FooterComponent]
})
export class LayoutModule {}
