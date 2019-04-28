import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CategoryService } from './../../../services/category.service';
import { Category } from '../../../models';

@Component({
  selector: 'yc-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryComponent implements OnInit {

  validateForm: FormGroup;
  categories: Category[];
  // tslint:disable-next-line:max-line-length
  randomColor = `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, .5)`;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    this.initForm();
    this.getCategories();
  }

  initForm() {
    this.validateForm = this.fb.group({
      name: ['', [Validators.required]]
    });
  }

  saveCategory() { }

  getCategories() {
    this.categoryService.getCategories()
      .subscribe(data => {
        this.categories = data;
      });
  }

  submitForm() {
    this.categoryService.saveCategory(this.validateForm.value)
      .subscribe(() => {
        this.getCategories();
      });
  }

}
