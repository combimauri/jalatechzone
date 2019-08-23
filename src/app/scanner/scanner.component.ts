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

  processQRCode(assistantId: string): void {
    if (!this.assistantId) {
      this.assistantId = assistantId;
      this.assistantSubscription = this.assistantService
        .getById(assistantId)
        .pipe(first())
        .subscribe(postulant => {
          if (postulant) {
            this.assistant = postulant;
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
    const postulantFieldValueForSelection = this.assistant[
      this.selectedItemForScan
    ];

    if (
      this.selectedItemForScan === 'teachersWhoGavePoints' ||
      !postulantFieldValueForSelection
    ) {
      this.processScanAccordingToField();
    } else {
      this.modalMessage = 'Assistant was already checked';
      this.modalImage = this.images.error;
    }
  }

  private processScanAccordingToField(): boolean {
    let scanCorrectly = false;

    // switch (this.selectedItemForScan) {
    //   case 'checkIn':
    //     scanCorrectly = this.assistantService.checkInAssistant(this.assistant);
    //     this.modalMessage = scanCorrectly
    //       ? 'Check in was correct'
    //       : 'Check in could not be completed. Review if the assistant was accepted';
    //     break;
    //   case 'feeForLunchReceived':
    //     scanCorrectly = this.assistantService.markFeeForLunchAsReceived(
    //       this.assistant
    //     );
    //     this.modalMessage = scanCorrectly
    //       ? 'Fee for lunch was received correctly'
    //       : 'Fee for lunch could not be processed. Review if the assistant made the check in';
    //     break;
    //   case 'lunchDelivered':
    //     scanCorrectly = this.assistantService.markLunchAsDelivered(
    //       this.assistant
    //     );
    //     this.modalMessage = scanCorrectly
    //       ? 'Lunch was delivered correctly'
    //       : 'Lunch could not be processed. Review if the assistant gave her/his fee';
    //     break;
    //   case 'firstSnackDelivered':
    //     scanCorrectly = this.assistantService.markFirstSnackAsDelivered(
    //       this.assistant
    //     );
    //     this.modalMessage = scanCorrectly
    //       ? 'First snack was delivered correctly'
    //       : 'First snack could not be processd. Review if the assistant made the check in';
    //     break;
    //   case 'secondSnackDelivered':
    //     scanCorrectly = this.assistantService.markSecondSnackAsDelivered(
    //       this.assistant
    //     );
    //     this.modalMessage = scanCorrectly
    //       ? 'Second snack was delivered correctly'
    //       : 'Second snack could not be processd. Review if the assistant made the check in';
    //     break;
    //   default:
    //     this.modalMessage = 'Looks like you did not choose an option';
    //     break;
    // }

    this.modalImage = scanCorrectly ? this.images.info : this.images.error;

    return scanCorrectly;
  }
}
