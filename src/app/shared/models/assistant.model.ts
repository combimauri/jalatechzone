import { Package } from './package.enum';

export interface Assistant {
  id: string;
  fullName?: string;
  email: string;
  package: Package;
  deleteFlag: boolean;
  phone?: string;
  insertDate?: Date;
  updateDate?: Date;
  checkIn?: boolean;
  snackOne?: boolean;
  snackTwo?: boolean;
  lunch?: boolean;
  visibleInSearch?: boolean;
}
