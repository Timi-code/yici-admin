import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';

const modules = [
  HttpClientModule,
  ReactiveFormsModule,
  FormsModule,
  NgZorroAntdModule
];

@NgModule({
  imports: [...modules],
  exports: [...modules]
})

export class ShareModule { }
