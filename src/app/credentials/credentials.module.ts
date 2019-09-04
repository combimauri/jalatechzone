import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CredentialsRoutingModule } from './credentials-routing.module';
import { CredentialsComponent } from './credentials.component';
import { CredentialModule } from '../shared/components/credential/credential.module';
import { AssistantService } from '../shared/services/assistant/assistant.service';

@NgModule({
  declarations: [CredentialsComponent],
  imports: [CommonModule, CredentialsRoutingModule, CredentialModule],
  providers: [AssistantService]
})
export class CredentialsModule {}
