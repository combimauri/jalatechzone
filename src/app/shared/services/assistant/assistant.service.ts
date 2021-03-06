import { Injectable, EventEmitter } from '@angular/core';
import {
  AngularFirestoreCollection,
  AngularFirestore
} from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Assistant } from '../../models/assistant.model';
import { Package } from '../../models/package.enum';

const collectionName = 'assistants';
const deleteFlagField = 'deleteFlag';
const fullNameField = 'fullName';

@Injectable()
export class AssistantService {
  private assistantsCollection: AngularFirestoreCollection<Assistant>;

  constructor(private db: AngularFirestore) {
    this.assistantsCollection = this.db.collection<Assistant>(
      collectionName,
      ref =>
        ref.where(deleteFlagField, '==', false).orderBy(fullNameField, 'asc')
    );
  }

  getById(id: string): Observable<Assistant> {
    return this.db
      .doc<Assistant>(`${collectionName}/${id}`)
      .valueChanges()
      .pipe(
        map(assistant => {
          if (assistant && !assistant.deleteFlag) {
            return assistant;
          }

          return null;
        })
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

      this.initializeCheckValues(assistant);
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

  validateFieldForScan(
    itemForScan: string,
    assistant: Assistant,
    messageEmitter: EventEmitter<string> = new EventEmitter()
  ): boolean {
    if (itemForScan === 'checkIn') {
      return true;
    }

    if (itemForScan === 'snackOne' || itemForScan === 'snackTwo') {
      const valid = !!assistant.checkIn;

      if (!valid) {
        messageEmitter.emit('Looks like the assistant did not make check in');
      }

      return valid;
    }

    if (itemForScan === 'lunch') {
      const validCheckIn = !!assistant.checkIn;
      const validPackage = assistant.package !== Package.teens;

      if (!validCheckIn) {
        messageEmitter.emit('Looks like the assistant did not make check in');
      }

      if (!validPackage) {
        messageEmitter.emit('Assistant cannot access this benefit');
      }

      return validCheckIn && validPackage;
    }

    return false;
  }

  private initializeCheckValues(assistant: Assistant): void {
    assistant.checkIn = false;
  }
}
