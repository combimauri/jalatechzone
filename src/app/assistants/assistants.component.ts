import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { AssistantsService } from './assistants.service';
import { Assistant } from '../shared/models/assistant.model';

@Component({
  selector: 'tz-assistants',
  templateUrl: './assistants.component.html',
  styleUrls: ['./assistants.component.scss']
})
export class AssistantsComponent implements OnInit {
  assistants$: Observable<Assistant[]>;

  constructor(private assistantsService: AssistantsService) {}

  ngOnInit(): void {
    this.assistants$ = this.assistantsService.getAssistants();
  }
}
