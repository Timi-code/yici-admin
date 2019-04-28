import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WordRoutingModule } from './word-routing.module';
import { ListComponent } from './list/list.component';
import { ShareModule } from '../../share/share.module';
import { CategoryComponent } from './category/category.component';
import { FormComponent } from './list/public/form/form.component';

@NgModule({
  declarations: [ListComponent, CategoryComponent, FormComponent],
  imports: [
    CommonModule,
    ShareModule,
    WordRoutingModule,
  ]
})
export class WordModule { }
