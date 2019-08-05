import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssistantsRoutingModule } from './assistants-routing.module';
import { AssistantsComponent } from './assistants.component';
import { AssistantsService } from './assistants.service';
import { PackageModule } from '../shared/pipes/package-parser/package-parser.module';

@NgModule({
  declarations: [AssistantsComponent],
  imports: [CommonModule, AssistantsRoutingModule, PackageModule],
  providers: [AssistantsService]
})
export class AssistantsModule {}
