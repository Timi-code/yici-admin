import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { WordService, CategoryService } from '@services/index';
import { Category, Word } from '@models/index';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'yc-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  visible: boolean; // 抽屉
  validateForm: FormGroup; // 搜索表单
  newWordForm: FormGroup; // 添加表单
  saving: boolean; // 保持中
  dataSet: Word[] = [];
  categories: Category[];
  editWord: Word;

  constructor(
    private fb: FormBuilder,
    private message: NzMessageService,
    private wordService: WordService,
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    this.initValidateForm();
    this.initNewWordForm();
    this.getWordList();
    this.getWordCategory();
  }

  // 搜索表单
  initValidateForm() {
    this.validateForm = this.fb.group({
      word: [],
      chinese: []
    });
  }

  // 添加新单词表单
  initNewWordForm() {
    this.newWordForm = this.fb.group({
      word: ['', [Validators.required]],
      category: [null, [Validators.required]],
      chinese: ['', [Validators.required]]
    });
  }

  resetForm() {
    this.newWordForm.reset();
  }

  handleCancel() {
    this.visible = false;
    this.editWord = null;
  }

  handleOk(word: Word) {
    console.log(word);
    if (this.editWord) {
      this.wordService.updateWord(word)
        .subscribe(data => {
          console.log(data);
          if (data) {
            this.getWordList();
            this.message.success('修改成功');
            this.visible = false;
          }
        });
    } else {
      this.wordService.saveWord(this.newWordForm.value)
        .subscribe(data => {
          if (data) {
            this.message.success('添加成功');
            this.visible = false;
            this.getWordList();
          }
        });
    }
  }

  editWordHandle(data: Word) {
    this.visible = true;
    this.editWord = data;
  }

  submitForm() {
    console.log(this.validateForm.value);
    // this.wordService.saveWord(this.validateForm.value)
    //   .subscribe(data => {
    //     console.log(data);
    //   });
  }

  // 获取单词列表
  getWordList() {
    this.wordService.getWordList()
      .subscribe((data: Word[]) => {
        console.log(data);
        this.dataSet = data;
      });
  }

  // 获取单词分类
  getWordCategory() {
    this.categoryService.getCategories()
      .subscribe(data => {
        this.categories = data;
      });
  }
}
