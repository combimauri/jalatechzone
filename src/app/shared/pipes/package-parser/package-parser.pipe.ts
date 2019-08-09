import { Pipe, PipeTransform } from '@angular/core';

import { Package } from '../../models/package.enum';

@Pipe({
  name: 'packageParser'
})
export class PackageParserPipe implements PipeTransform {
  transform(value: Package): string {
    switch (value) {
      case Package.teens:
        return 'Teens';
      case Package.gold:
        return 'Gold';
      case Package.platinum:
        return 'Platinum';
      case Package.jalaFamily:
        return 'Jala Family';
      default:
        return 'Invalid Package';
    }
  }
}
