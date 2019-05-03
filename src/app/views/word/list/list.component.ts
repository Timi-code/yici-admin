import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { WordService, CategoryService } from '@services/index';
import { Category, Word, ListParam, Result } from '@models/index';
import { NzMessageService } from 'ng-zorro-antd';
import { FormComponent } from './public/form/form.component';

export enum Sort {
  descend = 'DESC',
  ascend = 'ASC'
}

@Component({
  selector: 'yc-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @HostListener('window:resize')
  onscroll() {
    this.setScrollConfig();
  }

  searchText: string = '';
  categoryType: { [key: string]: string } = {}; // 分类汉字
  visible: boolean; // 抽屉
  loading: boolean; // 保存loading
  dataSet: Word[] = []; // 单词列表
  categories: Category[]; // 单词分类
  editWord: Word; // 当前编辑的单词
  scrollConfig: { y: string } = { y: '300px' }; // 表格滚动配置

  currentPage: number = 1; // 当前页码
  pageSize: number = 5; // 每页条数
  total: number; // 总条数
  listParams: ListParam; // 列表查询参数

  @ViewChild('wordForm') form: FormComponent;

  constructor(
    private message: NzMessageService,
    private wordService: WordService,
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    this.listParams = {
      currentPage: this.currentPage - 1,
      pageSize: this.pageSize,
      search: '',
      sort: ''
    }
    this.getWordList();
    this.getWordCategory();
    this.setScrollConfig();
  }

  closeModal() {
    this.visible = false;
  }

  /**
   * 确定
   * @param word 保存的单词和修改单词
   */
  handleOk(word: Word) {
    if (this.editWord) {
      this.updateWord(word);
    } else {
      this.saveWord(word);
    }
  }

  /**
   * 修改单词
   * @param data 编辑的单词
   */
  editWordHandle(data: Word) {
    this.visible = true;
    this.editWord = data;
  }

  /**
   * 保存新单词
   * @param word 新单词
   */
  saveWord(word: Word) {
    this.wordService.saveWord(word)
      .subscribe(data => {
        if (data) {
          this.message.success('添加成功');
          this.getWordList();
          this.closeModal();
          this.form.resetForm();
        }
      });
  }

  /**
   * 更新单词
   * @param word 单词
   */
  updateWord(word: Word) {
    this.wordService.updateWord(word)
      .subscribe(data => {
        if (data) {
          this.message.success('修改成功');
          this.getWordList();
          this.closeModal();
          this.form.resetForm();
        }
      });
  }

  /**
   * 单词排序
   * @param ev 排序key : value
   */
  sort(ev: { key: string; value: string }) {
    this.listParams.sort = Sort[ev.value];
    this.getWordList();
  }

  /**
   * 获取单词列表
   */
  getWordList() {
    if (this.loading) return;
    this.loading = true;
    this.listParams = {
      currentPage: this.currentPage - 1,
      pageSize: this.pageSize,
      search: this.searchText || ''
    }
    this.wordService.getWordList(this.listParams)
      .subscribe((data: Result<Word[]>) => {
        if (data.code === 200) {
          this.total = data.total;
          this.dataSet = data.data;
        }
      }, err => {
        console.log(err);
        this.loading = false;
      }, () => {
        this.loading = false;
      });
  }

  /**
   * 获取单词分类
   */
  getWordCategory() {
    this.categoryService.getCategories()
      .subscribe((data: Category[]) => {
        this.categories = data;
        data.forEach(item => {
          this.categoryType[item.id] = item.name;
        })
      });
  }

  /**
   * 设置scrollconfig
   */
  setScrollConfig() {
    this.scrollConfig = {
      y: document.body.scrollHeight - 430 + 'px'
    }
  }
}
