import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QRCodeModule } from 'angularx-qrcode';

import { CredentialComponent } from './credential.component';

@NgModule({
  declarations: [CredentialComponent],
  imports: [CommonModule, QRCodeModule],
  exports: [CredentialComponent]
})
export class CredentialModule {}
