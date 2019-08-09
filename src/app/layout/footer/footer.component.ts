import { Component } from '@angular/core';

@Component({
  selector: 'tz-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
  footerLink = 'http://tech-zone.org';
}
