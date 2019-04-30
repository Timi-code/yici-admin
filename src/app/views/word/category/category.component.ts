import { Component, OnInit } from '@angular/core';
import { CategoryService } from './../../../services/category.service';
import { Category } from '../../../models';

@Component({
  selector: 'yc-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryComponent implements OnInit {

  name: string;
  categories: Category[];
  // tslint:disable-next-line:max-line-length
  randomColor = `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, .5)`;

  constructor(
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    this.getCategories();
  }

  saveCategory() {
    this.categoryService.saveCategory(this.name)
      .subscribe(() => {
        this.name = '';
        this.getCategories();
      });
  }

  getCategories() {
    this.categoryService.getCategories()
      .subscribe(data => {
        this.categories = data;
      });
  }
}
