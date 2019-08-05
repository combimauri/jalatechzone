import { Injectable } from '@angular/core';
import {
  AngularFirestoreCollection,
  AngularFirestore
} from '@angular/fire/firestore';

import { Observable } from 'rxjs';

import { Assistant } from '../shared/models/assistant.model';

@Injectable()
export class AssistantsService {
  assistantsCollection: AngularFirestoreCollection<Assistant>;

  constructor(private db: AngularFirestore) {
    this.assistantsCollection = this.db.collection<Assistant>('assistants');
  }

  getAssistants(): Observable<Assistant[]> {
    return this.assistantsCollection.valueChanges();
  }
}
