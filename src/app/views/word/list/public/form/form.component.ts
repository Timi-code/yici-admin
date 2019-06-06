import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Word, Category } from '@models/index';
export class FormData implements Word {
  id?: number;
  word: string;
  category: number;
  chinese: string;
  examples?: string;
}

@Component({
  selector: 'yc-word-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  @Input() categories: Category[];
  @Input()
  set formData(value: FormData) {
    this._formData = value;
    this.initNewWordForm();
  }
  get formData() {
    return this._formData;
  }
  @Output() submitForm: EventEmitter<FormData> = new EventEmitter<FormData>();
  validateForm: FormGroup;

  private _formData: Word;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.initNewWordForm();
  }


  // 初始化新单词表单
  initNewWordForm() {
    const formData = this.formData || new FormData();
    this.validateForm = this.fb.group({
      id: [formData.id],
      word: [formData.word, [Validators.required]],
      category: [formData.category, [Validators.required]],
      chinese: [formData.chinese, [Validators.required]],
      examples: [formData.examples]
    });
  }

  /**
   * 重置表单
   */
  resetForm() {
    this.validateForm.reset();
  }

  /**
   * 确定
   */
  handleOk() {
    this.validateForm.patchValue({chinese: this.validateForm.controls['chinese'].value.replace('，', ',')})
    this.submitForm.emit(this.validateForm.value);
  }

}
