import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Subscription } from 'rxjs';

import { AssistantService } from '../shared/services/assistant/assistant.service';
import { Assistant } from '../shared/models/assistant.model';
import { CredentialComponent } from '../shared/components/credential/credential.component';
import { Package } from '../shared/models/package.enum';
import { MaterializeService } from '../shared/services/materialize/materialize.service';
import { SelectDirective } from '../shared/directives/select/select.directive';

@Component({
  selector: 'tz-assistants',
  templateUrl: './assistants.component.html',
  styleUrls: ['./assistants.component.scss']
})
export class AssistantsComponent implements OnInit, OnDestroy {
  readonly emptyAssistant: Assistant = {
    id: '',
    fullName: '',
    email: '',
    phone: '',
    package: Package.invalid,
    deleteFlag: false
  };
  searchTerm = '';
  assistants: Assistant[];
  assistantsSubscription: Subscription;
  selectedAssistant: Assistant;
  assistantsForm: FormGroup;
  currentCredential: CredentialComponent;
  @ViewChild('packageSelect', { static: true })
  private packageSelect: SelectDirective;

  constructor(
    public assistantService: AssistantService,
    private materialService: MaterializeService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.assistantsForm = this.formBuilder.group({ ...this.emptyAssistant });
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

  upsertAssistant(): void {
    this.assistantService
      .upsertAssistant(this.assistantsForm.value)
      .then(() => this.patchAssistantsForm(this.emptyAssistant));
  }

  patchAssistantsForm(assistant: Assistant): void {
    this.assistantsForm.patchValue({ ...assistant });
    this.materialService.updateTextFields();
    this.packageSelect.initFormSelect();
  }

  printCredential(): void {
    if (this.currentCredential) {
      this.currentCredential.print();
    }
  }
}
