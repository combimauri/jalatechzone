import { Injectable } from '@angular/core';
import {
  AngularFirestoreCollection,
  AngularFirestore
} from '@angular/fire/firestore';

import { Observable } from 'rxjs';

import { Assistant } from '../shared/models/assistant.model';

const collectionName = 'assistants';
const deleteFlagField = 'deleteFlag';
const firstNameField = 'firstName';

@Injectable()
export class AssistantsService {
  private assistantsCollection: AngularFirestoreCollection<Assistant>;

  constructor(private db: AngularFirestore) {
    this.assistantsCollection = this.db.collection<Assistant>(
      collectionName,
      ref =>
        ref.where(deleteFlagField, '==', false).orderBy(firstNameField, 'asc')
    );
  }

  getAssistants(): Observable<Assistant[]> {
    return this.assistantsCollection.valueChanges();
  }

  upsertAssistant(assistant: Assistant): Promise<void> {
    let id = assistant.id;

    if (!id) {
      id = this.db.createId();
      assistant.id = id;
      assistant.insertDate = new Date();
    } else {
      assistant.updateDate = new Date();
    }

    return this.assistantsCollection.doc(id).set(assistant, { merge: true });
  }

  deleteAssistant(assistant: Assistant): Promise<void> {
    if (assistant.id) {
      assistant.deleteFlag = true;

      return this.upsertAssistant(assistant);
    }

    return Promise.resolve();
  }
}
