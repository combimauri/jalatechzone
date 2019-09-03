import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Observable } from 'rxjs';

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
export class AssistantsComponent implements OnInit {
  readonly emptyAssistant: Assistant = {
    id: '',
    fullName: '',
    email: '',
    phone: '',
    package: Package.invalid,
    deleteFlag: false
  };
  assistants$: Observable<Assistant[]>;
  selectedAssistant: Assistant;
  assistantsForm: FormGroup;
  currentCredential: CredentialComponent;
  @ViewChild('packageSelect', { static: true })
  private packageSelect: SelectDirective;

  constructor(
    public assistantsService: AssistantService,
    private materialService: MaterializeService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.assistants$ = this.assistantsService.getAssistants();
    this.assistantsForm = this.formBuilder.group({ ...this.emptyAssistant });
  }

  upsertAssistant(): void {
    this.assistantsService
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
