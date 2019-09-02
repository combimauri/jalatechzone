import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ZXingScannerModule } from '@zxing/ngx-scanner';

import { ScannerRoutingModule } from './scanner-routing.module';
import { ScannerComponent } from './scanner.component';
import { AssistantService } from '../shared/services/assistant/assistant.service';
import { ModalModule } from '../shared/directives/modal/modal.module';
import { SelectModule } from '../shared/directives/select/select.module';

@NgModule({
  declarations: [ScannerComponent],
  imports: [
    CommonModule,
    FormsModule,
    ZXingScannerModule,
    ScannerRoutingModule,
    ModalModule,
    SelectModule
  ],
  providers: [AssistantService]
})
export class ScannerModule {}
