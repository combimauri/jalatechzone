import { Injectable } from '@angular/core';

import * as Materialize from 'materialize-css';

@Injectable()
export class MaterializeService {
  updateTextFields(): void {
    Materialize.updateTextFields();
  }
}
