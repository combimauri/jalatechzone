import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';

import { Observable } from 'rxjs';
import * as jsPDF from 'jspdf';

import { Assistant } from '../shared/models/assistant.model';
import { AssistantService } from '../shared/services/assistant/assistant.service';
import { CredentialComponent } from '../shared/components/credential/credential.component';

const firstLineTop = 20;
const secondLineTop = 450;
const firstItemLeft = 10;
const secondItemLeft = 300;
const JPEG = 'JPEG';

@Component({
  selector: 'tz-credentials',
  templateUrl: './credentials.component.html',
  styleUrls: ['./credentials.component.scss']
})
export class CredentialsComponent implements OnInit {
  assistants$: Observable<Assistant[]>;
  @ViewChildren('credentials')
  credentials: QueryList<CredentialComponent>;

  constructor(private postulantsService: AssistantService) {}

  ngOnInit(): void {
    this.assistants$ = this.postulantsService.getAssistants();
  }

  printCredentials(): void {
    const pdf = new jsPDF('p', 'pt', 'legal');
    const quantityOfCredentials = this.credentials.length;
    let drawCounter = 0;
    let counter = 0;

    this.credentials.forEach(credential => {
      counter++;

      const credentialData = credential.credentialCanvas.nativeElement.toDataURL(
        'image/jpeg',
        1.0
      );

      switch (counter) {
        case 1:
          pdf.addImage(credentialData, JPEG, firstItemLeft, firstLineTop);
          drawCounter++;
          break;
        case 2:
          pdf.addImage(credentialData, JPEG, secondItemLeft, firstLineTop);
          drawCounter++;
          break;
        case 3:
          pdf.addImage(credentialData, JPEG, firstItemLeft, secondLineTop);
          drawCounter++;
          break;
        case 4:
          pdf.addImage(credentialData, JPEG, secondItemLeft, secondLineTop);
          drawCounter++;
          if (quantityOfCredentials !== drawCounter) {
            pdf.addPage();
          }
          counter = 0;
          break;
      }
    });

    pdf.save('techzone-credentials.pdf');
  }
}
