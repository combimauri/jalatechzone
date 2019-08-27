import {
  Component,
  OnInit,
  OnChanges,
  Output,
  EventEmitter,
  Input,
  ViewChild,
  ElementRef
} from '@angular/core';

import { QRCodeComponent } from 'angularx-qrcode';

import { Assistant } from '../../models/assistant.model';

@Component({
  selector: 'tz-credential',
  templateUrl: './credential.component.html',
  styleUrls: ['./credential.component.scss']
})
export class CredentialComponent implements OnInit, OnChanges {
  qrData = 'QR was not generated yet';
  @Output() credentialLoaded = new EventEmitter();
  @Input() canvasWidth: number;
  @Input() canvasHeight: number;
  @Input() assistant: Assistant;
  @ViewChild('credentialCanvas', { static: true })
  credentialCanvas: ElementRef;
  @ViewChild('qrCode', { static: true })
  private qrCode: QRCodeComponent;

  get assistantFirstName() {
    return this.assistant.firstName.split(' ')[0];
  }

  get assistantLastName() {
    return this.assistant.lastName.split(' ')[0];
  }

  ngOnInit(): void {
    this.credentialLoaded.emit();
  }

  ngOnChanges(): void {
    this.loadCredential();
  }

  print(): void {
    const printButton = document.createElement('a');
    printButton.download = `${this.assistant.firstName} ${
      this.assistant.lastName
    }`;
    printButton.href = this.credentialCanvas.nativeElement.toDataURL(
      'image/png;base64'
    );

    printButton.click();
  }

  private loadCredential(): void {
    if (this.assistant) {
      this.qrData = this.assistant.id;
      const context = (this.credentialCanvas
        .nativeElement as HTMLCanvasElement).getContext('2d');
      const templateImage = new Image();
      const qrTop = 170;
      const qrLeft = 80;
      const nameTop = 160;
      const nameLeft = this.canvasWidth / 2;

      templateImage.src = 'assets/images/cred-ver.png';
      templateImage.onload = () => {
        let qrImage = this.qrCode.el.nativeElement.querySelector('img');

        if (!qrImage.src) {
          qrImage = this.qrCode.el.nativeElement.querySelector('canvas');
        }

        context.drawImage(templateImage, 0, 0);
        context.font = '40px Antonio';
        context.textAlign = 'center';
        context.fillText(
          `${this.assistantFirstName} ${this.assistantLastName}`,
          nameLeft,
          nameTop
        );
        context.drawImage(qrImage, qrLeft, qrTop);
      };
    }
  }
}
