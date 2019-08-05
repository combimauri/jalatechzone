import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PackageParserPipe } from './package-parser.pipe';

@NgModule({
  declarations: [PackageParserPipe],
  imports: [CommonModule],
  exports: [PackageParserPipe]
})
export class PackageModule {}
