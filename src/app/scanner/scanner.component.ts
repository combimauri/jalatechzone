import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';

import { Subscription, Observable } from 'rxjs';
import { first } from 'rxjs/operators';

import { AssistantService } from '../shared/services/assistant/assistant.service';
import { Assistant } from '../shared/models/assistant.model';
import { ModalDirective } from '../shared/directives/modal/modal.directive';

@Component({
  selector: 'tz-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.scss']
})
export class ScannerComponent implements OnInit, OnDestroy {
  images = {
    info: 'assets/images/processed.png',
    error: 'assets/images/error.png'
  };
  modalImage = this.images.error;
  modalMessage: string;
  selectedItemForScan: string;
  assistantId: string;
  assistant: Assistant;
  assistantSubscription: Subscription;
  @ViewChild('assistantProcessedModal', { static: true })
  assistantModal: ModalDirective;

  constructor(private assistantService: AssistantService) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    if (this.assistantSubscription) {
      this.assistantSubscription.unsubscribe();
    }
  }

  processCode(assistantId: string): void {
    if (!this.assistantId) {
      this.assistantId = assistantId;
      this.assistantSubscription = this.assistantService
        .getById(assistantId)
        .pipe(first())
        .subscribe(assistant => {
          console.log(assistant);
          if (assistant) {
            this.assistant = assistant;
            this.processScanSelection();
          } else {
            this.modalMessage = 'This does not look like a valid credential';
            this.modalImage = this.images.error;
          }

          setTimeout(() => {
            this.assistantModal.modalInstance.open();
          }, 100);
        });
    }
  }

  cleanData(): void {
    this.assistantId = '';
    this.assistant = null;
    this.assistantSubscription.unsubscribe();
  }

  private processScanSelection(): void {
    const assistantFieldValueForSelection = this.assistant[
      this.selectedItemForScan
    ];

    if (!assistantFieldValueForSelection) {
      this.assistant[this.selectedItemForScan] = true;

      this.assistantService.upsertAssistant(this.assistant);

      this.modalMessage = `${this.selectedItemForScan} checked successfully`;
      this.modalImage = this.images.info;
    } else {
      this.modalMessage = 'Assistant was already checked';
      this.modalImage = this.images.error;
    }
  }
}
