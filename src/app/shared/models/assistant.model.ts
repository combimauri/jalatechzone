import { Package } from './package.enum';

export interface Assistant {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  package: Package;
  deleteFlag: boolean;
}
