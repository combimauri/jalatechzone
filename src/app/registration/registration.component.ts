import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { Assistant } from '../shared/models/assistant.model';
import { AssistantService } from '../shared/services/assistant/assistant.service';

@Component({
  selector: 'tz-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit, OnDestroy {
  searchTerm = '';
  rfidInputEnabled = false;
  assistants: Assistant[];
  assistantsSubscription: Subscription;

  constructor(public assistantService: AssistantService) {}

  ngOnInit(): void {
    this.assistantsSubscription = this.assistantService
      .getAssistants()
      .subscribe(assistants => {
        this.assistants = assistants;
        this.searchAssistant();
      });
  }

  ngOnDestroy(): void {
    if (this.assistantsSubscription) {
      this.assistantsSubscription.unsubscribe();
    }
  }

  searchAssistant(): void {
    if (this.searchTerm) {
      this.assistants.forEach(assistant => {
        assistant.visibleInSearch = assistant.fullName
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase());
      });
    } else {
      this.assistants.forEach(assistant => {
        assistant.visibleInSearch = true;
      });
    }
  }

  checkAssistant(assistant: Assistant, field: string): void {
    if (this.assistantService.validateFieldForScan(field, assistant)) {
      assistant[field] = !assistant[field];
      this.assistantService.upsertAssistant(assistant);
    }
  }
}
